import * as path from "path";
import { Command } from "./types/Command";
import { Config } from "./types/Config";
import { IConfigExternal } from "./types/interfaces/IConfigExternal";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { ConfigMapper } from "./types/mappers/ConfigMapper";
import RenderFactory from "./types/render/RenderEngineFactory";
import { Transport } from "./types/Transport";
import { getUtf8File, writeUtf8File } from "./utils/file";

/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
  private options: Config;
  private render: IRenderEngine;

  constructor(options: IConfigExternal) {
    this.render = RenderFactory.createMustache();
    this.options = ConfigMapper.fromConfigExternal(options);
  }

  public getCommand(name: string): Command | undefined {
    return this.options.commands[name];
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
    const { basePath } = this.options;
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

  public transport({
    transport,
    globalSource,
    transportSource
  }: {
    transport: Transport;
    globalSource: object;
    transportSource: object;
  }): void {
    const localSource: object = Object.assign(
      transportSource,
      globalSource,
    );
    const resolvedPaths = this.resolvePaths({ transport, globalSource, transportSource });
    // Get file content
    const fromContentFile: string = getUtf8File(resolvedPaths.from);
    // Render the content file with args
    const fromContentRendered: string = this.render.render(
      fromContentFile,
      localSource,
    );

    writeUtf8File(resolvedPaths.to, fromContentRendered);
  }
}

export default Generator;
