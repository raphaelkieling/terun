import { Command } from "./Command";
import { IConfigExternal } from '@terun/core/dist/types/interfaces/IConfigExternal'
import { Utils, Generator } from '@terun/core'
import { ConfigReader } from "../ConfigReader";

export class MakeCommand extends Command {
    constructor() {
        super('make');
    }

    configure() {
        console.log('configurando v2')
    }

    execute() {
        const config: IConfigExternal | null = ConfigReader.find();
        console.log(config)

        if (!config) {
            Utils.Log.error("Config file terun.js not found");
            return;
        }

        const generator = new Generator(config);
        generator.initTransport('example');
    }
}