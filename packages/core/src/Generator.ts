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

  /**
   *
   * Init the transport with a command name, it's is a entry
   * point to generator to create files.
   *
   * ```js
   * commands:{
   *    makeCrud: {
   *      ...
   *    }
   * }
   * ```
   *
   * Use commandName param with "makeCrud".
   *
   * @param commandName string with name key
   */
  public async initTransport(commandName: string) {
    const command: Command | undefined = this.getCommand(commandName);

    if (!command) {
      throw new Error("Command not found");
    }

    await this.transportByCommand(command);
  }

  public async transportByCommand(command: Command) {
    const transports: Transport[] = command.transports;

    for (const transportInstance of transports) {
      this.transport({
        globalSource: command.getSource(),
        transport: transportInstance,
      });
    }
  }

  public getCommand(name: string): Command | undefined {
    return this.options.commands[name];
  }

  public transport({
    transport,
    globalSource,
  }: {
    transport: Transport;
    globalSource: object;
  }): void {
    const { basePath } = this.options;
    const localSource: object = Object.assign(
      transport.getSource(),
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

    // Get file content
    const fromContentFile: string = getUtf8File(pathFrom);
    // Render the content file with args
    const fromContentRendered: string = this.render.render(
      fromContentFile,
      localSource,
    );

    writeUtf8File(pathTo, fromContentRendered);
  }
}

export default Generator;
