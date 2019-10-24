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

/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
  public globalConfig: Config;
  public render: IRenderEngine;
  public pluginManager: PluginManager;

  constructor(config: IConfigExternal) {
    this.globalConfig = ConfigMapper.fromConfigExternal(config);
    this.render = RenderFactory.make(this.globalConfig.engine);
    this.pluginManager = new PluginManager();
    this.pluginManager.configure(this.globalConfig);
  }

  public getCommand(name: string): Command | undefined {
    return this.globalConfig.commands[name];
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
  }): Promise<boolean> {
    await this.pluginManager.onInit();
    await this.pluginManager.onTransport(transport);

    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );

    if (transport.validator !== null) {
      if (typeof transport.validator === "function") {
        if (!await transport.validator({ args: localSource })) return false;
      } else if (typeof transport.validator === "boolean") {
        if (!transport.validator) return false
      }
    }

    const localSourcePlugin = await this.pluginManager.beforeRender(localSource);

    const resolvedPaths = await this.resolvePaths({ transport, globalSource, transportSource });
    // Get file content
    const fromContentFile: string = getUtf8File(resolvedPaths.from);
    // Render the content file with args FROM PLUGIN
    const fromContentRendered: string = await this.render.render(
      fromContentFile,
      localSourcePlugin,
    );

    writeUtf8File(resolvedPaths.to, fromContentRendered);

    return await this.pluginManager.done();
  }
}

export default Generator;
