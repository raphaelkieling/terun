import { Command } from "./types/Command";
import { Config } from "./types/Config";
import { IConfigExternal } from "./types/interfaces/IConfigExternal";
import { IRenderEngine } from "./types/interfaces/IRenderEngine";
import { Transport } from "./types/Transport";
import PluginManager from './types/PluginManager';
import { SyncHook } from "tapable";
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
declare class Generator {
    globalConfig: Config;
    render: IRenderEngine;
    pluginManager: PluginManager;
    hooks: {
        [key: string]: SyncHook;
    };
    constructor(config: IConfigExternal);
    getCommand(name: string): Command | undefined;
    installPlugins(): void;
    resolvePaths({ transport, globalSource, transportSource }: {
        transport: Transport;
        globalSource: object;
        transportSource: object;
    }): Promise<{
        from: string;
        to: string;
    }>;
    transport({ transport, globalSource, transportSource }: {
        transport: Transport;
        globalSource: object;
        transportSource: object;
    }): Promise<void>;
}
export default Generator;
