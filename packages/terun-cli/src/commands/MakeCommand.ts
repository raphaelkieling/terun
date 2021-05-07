import { Command } from "./Command";
import { IConfigExternal } from "@terun/core/lib/types/interfaces/IConfigExternal";
import { Utils, Generator } from "@terun/core/lib";
import { ConfigReader } from "../ConfigReader";
import prompts from "prompts";
import { ITransport } from "@terun/core/lib/types/interfaces/ITransport";
import { IArgs } from "@terun/core/lib/types/interfaces/IArgs";
import { canOverride, defaultConfig } from "../utils/prompts";
import ArgsMapper from "../dataMapper/ArgsMapper";
import { CommanderStatic } from "commander";

type MakeCommandParams = {
  override: boolean;
  debug: boolean;
  commandName: string;
};
export class MakeCommand implements Command {
  private config: IConfigExternal | null = null;

  private async getArgsWithPrompts(args: IArgs[]): Promise<object> {
    let params: any = {};
    for (const arg of args) {
      const result = await prompts(arg, defaultConfig);

      params = {
        ...params,
        ...result,
      };
    }
    return params;
  }

  async handle(program: CommanderStatic): Promise<void> {
    program
      .command("make <commandName>")
      .description("Execute a command")
      .option("-o, --override", "Override the file without confirm")
      .option(
        "-d, --debug",
        "Debug showing some important template resolutions"
      )
      .action(async (commandName: string, args: MakeCommandParams) => {
        try {
          this.config = ConfigReader.find();

          if (!this.config) {
            Utils.Log.error("Config file terun.js not found");
            return;
          }

          const generator = new Generator(this.config);
          const command = generator.getCommand(commandName);

          if (!command) {
            Utils.Log.error(`Command [${commandName}] not found on config`);
            return;
          }

          // Start the hook system into the command
          if (command.hook && typeof command.hook === "function")
            command.hook(generator.hooks);

          generator.hooks.fileExists.tapPromise("CLI", () => {
            return canOverride();
          });

          generator.hooks.fileSkipped.tap("CLI", () => {
            Utils.Log.warn("Relax, file skyped");
          });

          generator.hooks.done.tap("CLI", () => {
            Utils.Log.success("File transported with success!");
          });

          if (command.plugins) {
            for (const plugin of command.plugins) {
              generator.pluginManager.addPlugin(plugin);
            }
          }

          generator.hooks.global.tapPromise("CLI", async () => {
            if ((command.args || []).length) {
              Utils.Log.log("[Global arguments]");
            }

            command.args = ArgsMapper.fromList(command.args);
            return await this.getArgsWithPrompts(command.args);
          });

          await generator.init();

          const transports: ITransport[] = command.transports;

          for (const transport of transports) {
            Utils.Log.log(`[process]: ${transport.name || transport.from}`);

            transport.args = ArgsMapper.fromList(transport.args || []);

            const transportSource = await this.getArgsWithPrompts(
              transport.args
            );
            const defaultIsOverride = args.override !== true;
            const defaultDebug = args.debug === true;

            await generator.transport({
              source: transportSource,
              transport,
              override: defaultIsOverride,
              debug: defaultDebug,
            });
          }
        } catch (e) {
          console.error(e);
        }
      });
  }
}
