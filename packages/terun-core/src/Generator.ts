import * as path from "path";
import { Command } from "./types/Command";
import { Config } from "./types/Config";
import { IConfigExternal } from "./types/interfaces/IConfigExternal";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { ConfigMapper } from "./types/mappers/ConfigMapper";
import RenderFactory from "./types/render/RenderEngineFactory";
import { Transport } from "./types/Transport";
import Utils from "./utils";
import PluginManager from './types/PluginManager';
import { SyncHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook, AsyncSeriesHook } from "tapable";
import * as fs from 'fs';
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
  public globalConfig: Config;
  public globalArg: any;
  public render: IRenderEngine;
  public pluginManager: PluginManager;
  public hooks: { [key: string]: SyncHook };

  constructor(config: IConfigExternal) {
    this.globalConfig = ConfigMapper.fromConfigExternal(config);
    this.render = RenderFactory.make(this.globalConfig.engine);
    this.hooks = {
      global: new AsyncSeriesWaterfallHook(["transport", "source"]),
      fileExists: new AsyncSeriesBailHook(),
      fileSkipped: new SyncHook(),
      configure: new SyncHook(["globalConfig"]),
      onTransport: new SyncHook(["transport", "source"]),
      beforeRender: new AsyncSeriesWaterfallHook(["transport", "source"]),
      done: new SyncHook()
    };
    this.pluginManager = new PluginManager();
  }

  async init(): Promise<void> {
    this.installPlugins();
    this.globalArg = await this.hooks.global.promise() || {};
  }

  public getCommand(name: string): Command | undefined {
    return this.globalConfig.commands[name];
  }

  public installPlugins(): void {
    this.pluginManager.install(this.hooks);
  }

  public async resolvePaths({
    transport,
    source
  }: {
    transport: Transport;
    source: object;
  }): Promise<{ from: string, to: string }> {
    const { basePath } = this.globalConfig;
    const localSource: object = Object.assign(source);
    const pathFrom: string = path.join(
      basePath,
      await this.render.render(transport.from, localSource, this.globalConfig.tag),
    );
    const pathTo: string = path.join(
      basePath,
      await this.render.render(transport.to, localSource, this.globalConfig.tag),
    );

    return {
      from: pathFrom,
      to: pathTo
    }
  }

  public async transport({
    transport,
    source,
    override = false,
    debug = false
  }: {
    transport: Transport;
    source: object;
    override?: boolean;
    debug?: boolean;
  }): Promise<void> {
    this.hooks.configure.call(this.globalConfig)
    this.hooks.onTransport.call(transport, source);

    const localSource: object = Object.assign(source, this.globalArg);

    if (debug) {
      Utils.Log.log(JSON.stringify(localSource, null, 2));
    }

    if (transport.validator !== null) {
      if (typeof transport.validator === "function") {
        if (!await transport.validator({ args: localSource })) return;
      } else if (typeof transport.validator === "boolean") {
        if (!transport.validator) return;
      }
    }

    const localSourcePlugin: any = await this.hooks.beforeRender.promise(localSource) || localSource;

    const resolvedPaths = await this.resolvePaths({ transport, source });

    /**
     * The file need exists and command override is different that true
     */
    const fileExists = fs.existsSync(resolvedPaths.to);
    if (fileExists && override) {
      const overrideChoice = await this.hooks.fileExists.promise();
      if (!overrideChoice) {
        this.hooks.fileSkipped.call();
        return;
      };
    }

    // Get file content
    const fromContentFile: string = Utils.File.getUtf8File(resolvedPaths.from);
    // Render the content file with args FROM PLUGIN
    const fromContentRendered: string = await this.render.render(
      fromContentFile,
      localSourcePlugin,
      this.globalConfig.tag
    );

    await Utils.File.createDir(resolvedPaths.to);

    Utils.File.writeUtf8File(resolvedPaths.to, fromContentRendered);

    this.hooks.done.call(transport, source);
  }
}

export default Generator;
