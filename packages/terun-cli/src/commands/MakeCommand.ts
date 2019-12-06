import { Command } from "./Command";
import { IConfigExternal } from "@terun/core/lib/types/interfaces/IConfigExternal";
import { Utils, Generator } from "@terun/core";
import { ConfigReader } from "../ConfigReader";
import * as prompts from "prompts";
import { Transport } from "@terun/core/lib/types/Transport";
import { IArgs } from "@terun/core/lib/types/interfaces/IArgs";
import * as fs from "fs";
import { canOverride, defaultConfig } from "../utils/prompts";
import ArgsMapper from "../dataMapper/ArgsMapper";

export class MakeCommand extends Command {
  private config: IConfigExternal | null = null;

  constructor() {
    super("make");
  }

  configure(): void {
    this.readParam("make")
      .readParam("override")
      .readParam("debug");
  }

  private async getArgsWithPrompts(args: IArgs[]): Promise<object> {
    let params: any = {};
    console.log(args)
    for (const arg of args) {
      const result = await prompts(arg, defaultConfig);

      params = {
        ...params,
        ...result
      };
    }
    return params;
  }

  async execute(): Promise<any> {
    try {
      this.config = ConfigReader.find();

      if (!this.config) {
        Utils.Log.error("Config file terun.js not found");
        return;
      }

      const commandName = this.params.get("make");

      const generator = new Generator(this.config);
      const command = generator.getCommand(commandName);

      if (!command) {
        Utils.Log.error(`Command [${commandName}] not found on config`);
        return;
      }

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
        Utils.Log.log("[Global arguments]");
        command.args = ArgsMapper.fromList(command.args);
        return await this.getArgsWithPrompts(command.args);
      });

      await generator.init();

      const transports: Transport[] = command.transports;

      for (const transport of transports) {
        Utils.Log.log(`[process]: ${transport.name || transport.from}`);

        transport.args = ArgsMapper.fromList(transport.args);
        const transportSource = await this.getArgsWithPrompts(transport.args);
        const defaultIsOverride = this.params.get("override") !== true;
        const defaultDebug = this.params.get("debug") === true;

        await generator.transport({
          source: transportSource,
          transport,
          override: defaultIsOverride,
          debug: defaultDebug
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
