import { Command } from "../Command";
import { Config } from "../Config";
import { IConfigExternal } from "../interfaces/IConfigExternal";

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
