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
    globalArg: any;
    render: IRenderEngine;
    pluginManager: PluginManager;
    hooks: {
        [key: string]: SyncHook;
    };
    constructor(config: IConfigExternal);
    init(): Promise<void>;
    getCommand(name: string): Command | undefined;
    installPlugins(): void;
    resolvePaths({ transport, source }: {
        transport: Transport;
        source: object;
    }): Promise<{
        from: string;
        to: string;
    }>;
    transport({ transport, source, override, debug }: {
        transport: Transport;
        source: object;
        override?: boolean;
        debug?: boolean;
    }): Promise<void>;
}
export default Generator;
