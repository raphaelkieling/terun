import { Command } from "./Command";
import { ConfigReader } from "../ConfigReader";
import { canOverride } from "../utils/prompts";
import { Utils } from "@terun/core";

export class InitCommand extends Command {
    constructor() {
        super('init');
    }

    configure(): void {
        this.readParam('override');
    }

    async execute(): Promise<any> {
        if (ConfigReader.exist() && this.params.get('override') !== true) {
            const override = await canOverride();
            if (!override) {
                Utils.Log.warn("Operation canceled.");
                return;
            };
        }

        ConfigReader.create(`
module.exports = {
    commands: {
        example: {
            args: [],
            transports: []
        }
    }
};
        `.trim());

        Utils.Log.success("Config created with success!")
    }
}