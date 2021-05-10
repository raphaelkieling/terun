import { Command } from '../types/Command';
import { Config } from '../types/Config';
import { IConfigExternal } from '../types/interfaces';

export class ConfigMapper {
    public static fromConfigExternal(options: IConfigExternal): Config {
        const config = new Config();
        config.basePath = options.basePath || config.basePath;
        config.tag = options.tag || config.tag;
        config.engine = options.engine || config.engine;

        for (const [key, command] of Object.entries(options.commands)) {
            config.commands[key] = new Command(command);
        }

        return config;
    }
}
