import { Command } from "./Command";
import { ConfigReader } from "../ConfigReader";
import { canOverride } from "../utils/prompts";
import { Utils } from "@terun/core";

export class InitCommand extends Command {
  constructor() {
    super("init");
  }

  configure(): void {
    this.readParam("override");
  }

  async execute(): Promise<any> {
    if (ConfigReader.exist() && this.params.get("override") !== true) {
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
            // Put your plugins here! See in https://terun.netlify.app/1.2.1-alpha.0/reference/plugins.html#using-your-first-plugin
            plugins:[],
            args: [],
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
  }
}
