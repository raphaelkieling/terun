import { Command } from "./Command";
import { ConfigReader } from "../ConfigReader";
import { canOverride } from "../utils/prompts";
import { Utils } from "@terun/core";
import { CommanderStatic } from "commander";

type InitCommandArgs = {
  override: boolean;
};

export class InitCommand implements Command {
  async handle(program: CommanderStatic): Promise<any> {
    program
      .command("init")
      .description("Init the terun configuration")
      .option("-o, --override", "Override the file without confirm")
      .action(async (args: InitCommandArgs) => {
        if (ConfigReader.exist() && args.override !== true) {
          const override = await canOverride();

          if (!override) {
            Utils.Log.warn("Operation canceled.");
            return;
          }
        }

        ConfigReader.create(
          `
module.exports = {
    commands: {
        // Create your commands here and exec with > terun --make example
        example: {
            // Put your plugins here! See in https://terun.netlify.app/latest/reference/plugins.html#using-your-first-plugin
            plugins:[],
            args: [],
            hook: (hooks)=>{},
            transports: []
        }
    }
};
                `.trim()
        );

        Utils.Log.info(
          "Thanks for believing in this project! We working hard to improve the experience 💖"
        );
        Utils.Log.success("Config created with success!");
      });
  }
}
