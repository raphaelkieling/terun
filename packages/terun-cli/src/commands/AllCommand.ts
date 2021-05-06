import { Command } from "./Command";
import { IConfigExternal } from "@terun/core/lib/types/interfaces/IConfigExternal";
import { Utils } from "@terun/core";
import { ConfigReader } from "../ConfigReader";
import chalk from "chalk";

export class AllCommand extends Command {
  private config: IConfigExternal | null = null;

  constructor() {
    super("commands");
  }

  configure(): void {}

  async execute(): Promise<void> {
    this.config = ConfigReader.find();

    if (!this.config) {
      Utils.Log.error("Config file terun.js not found");
      return;
    }

    try {
      const commands: string[] = Object.keys(this.config.commands);
      for (const command of commands) {
        console.log(chalk.green(`- ${command}`));
      }
      console.log("\n");
    } catch (e) {
      Utils.Log.error(e);
    }
  }
}
