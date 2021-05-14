import { Command } from '../../../core/Command';
import { Config } from '../../../core/Config';
import { IConfigExternal } from '../interfaces/IConfigExternal';
import { IConfig, ITransportItem } from '../../../core/interfaces';
import { TransportItem } from '../../../core/TransportItem';
import ArgsMapper from './ArgsMapper';

export class ConfigMapper {
    static toTransportItem(transport: ITransportItem): ITransportItem {
        const transportItem = new TransportItem(transport);
        transportItem.args = ArgsMapper.fromList(transport.args || []);
        return transportItem;
    }

    /**
     * Map to internal config. Resolve type arguments and some
     * default config definition
     *
     * @param options
     */
    public static toInternalConfig(options: IConfigExternal): IConfig {
        const config = new Config();
        config.basePath = options.basePath || config.basePath;
        config.tag = options.tag || config.tag;
        config.engine = options.engine || config.engine;

        for (const [key, command] of Object.entries(options.commands)) {
            const commandMapped = new Command(command);
            commandMapped.args = ArgsMapper.fromList(commandMapped.args);
            commandMapped.transports = commandMapped.transports.map(ConfigMapper.toTransportItem);

            config.commands[key] = commandMapped;
        }

        return config;
    }
}
