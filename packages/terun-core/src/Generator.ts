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
    this.render = RenderFactory.createMustache();
    this.globalConfig = ConfigMapper.fromConfigExternal(config);
    this.pluginManager = new PluginManager();
    this.pluginManager.configure(this.globalConfig);
  }

  public getCommand(name: string): Command | undefined {
    return this.globalConfig.commands[name];
  }

  public resolvePaths({
    transport,
    globalSource,
    transportSource
  }: {
    transport: Transport;
    globalSource: object;
    transportSource: object;
  }): { from: string, to: string } {
    const { basePath } = this.globalConfig;
    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );

    const pathFrom: string = path.join(
      basePath,
      this.render.render(transport.from, localSource),
    );
    const pathTo: string = path.join(
      basePath,
      this.render.render(transport.to, localSource),
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
    await this.pluginManager.onInit();
    await this.pluginManager.onTransport(transport);

    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );

    const localSourcePlugin = await this.pluginManager.beforeRender(localSource);

    const resolvedPaths = this.resolvePaths({ transport, globalSource, transportSource });
    // Get file content
    const fromContentFile: string = getUtf8File(resolvedPaths.from);
    // Render the content file with args FROM PLUGIN
    const fromContentRendered: string = this.render.render(
      fromContentFile,
      localSourcePlugin,
    );

    // TODO: Need done this
    await this.pluginManager.done();

    writeUtf8File(resolvedPaths.to, fromContentRendered);
  }
}

export default Generator;
