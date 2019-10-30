import * as path from "path";
import { Command } from "./types/Command";
import { Config } from "./types/Config";
import { IConfigExternal } from "./types/interfaces/IConfigExternal";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { ConfigMapper } from "./types/mappers/ConfigMapper";
import RenderFactory from "./types/render/RenderEngineFactory";
import { Transport } from "./types/Transport";
import { getUtf8File, writeUtf8File } from "./utils/file";
import PluginManager from './types/PluginManager';
import { SyncHook, Hook } from "tapable";

/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
  public globalConfig: Config;
  public render: IRenderEngine;
  public pluginManager: PluginManager;
  public hooks: { [key: string]: SyncHook };

  constructor(config: IConfigExternal) {
    this.globalConfig = ConfigMapper.fromConfigExternal(config);
    this.render = RenderFactory.make(this.globalConfig.engine);
    this.hooks = {
      configure: new SyncHook(["globalConfig"]),
      onTransport: new SyncHook(["transport", "globalSource", "transportSource"]),
      beforeRender: new SyncHook(["transport", "localSource"]),
      done: new SyncHook()
    };
    this.pluginManager = new PluginManager();
  }

  public getCommand(name: string): Command | undefined {
    return this.globalConfig.commands[name];
  }

  public installPlugins() {
    this.pluginManager.install(this.hooks);
  }

  public async resolvePaths({
    transport,
    globalSource,
    transportSource
  }: {
    transport: Transport;
    globalSource: object;
    transportSource: object;
  }): Promise<{ from: string, to: string }> {
    const { basePath } = this.globalConfig;
    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );

    const pathFrom: string = path.join(
      basePath,
      await this.render.render(transport.from, localSource),
    );
    const pathTo: string = path.join(
      basePath,
      await this.render.render(transport.to, localSource),
    );

    return {
      from: pathFrom,
      to: pathTo
    }
  }

  public async transport({
    transport,
    globalSource,
    transportSource
  }: {
    transport: Transport;
    globalSource: object;
    transportSource: object;
  }): Promise<void> {
    await this.hooks.configure.promise(this.globalConfig)
    await this.hooks.onTransport.promise(transport, globalSource, transportSource);

    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );

    if (transport.validator !== null) {
      if (typeof transport.validator === "function") {
        if (!await transport.validator({ args: localSource })) return;
      } else if (typeof transport.validator === "boolean") {
        if (!transport.validator) return;
      }
    }

    const localSourcePlugin: any = await this.hooks.beforeRender.promise(localSource) || localSource;

    const resolvedPaths = await this.resolvePaths({ transport, globalSource, transportSource });
    // Get file content
    const fromContentFile: string = getUtf8File(resolvedPaths.from);
    // Render the content file with args FROM PLUGIN
    const fromContentRendered: string = await this.render.render(
      fromContentFile,
      localSourcePlugin,
    );

    writeUtf8File(resolvedPaths.to, fromContentRendered);

    this.hooks.done.call(transport, globalSource, transportSource);
  }
}

export default Generator;
