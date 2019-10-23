import { Command } from "./types/Command";
import { IConfigExternal } from "./types/interfaces/IConfigExternal";
import { Transport } from "./types/Transport";
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
declare class Generator {
    private options;
    private render;
    constructor(options: IConfigExternal);
    getCommand(name: string): Command | undefined;
    resolvePaths({ transport, globalSource, transportSource }: {
        transport: Transport;
        globalSource: object;
        transportSource: object;
    }): {
        from: string;
        to: string;
    };
    transport({ transport, globalSource, transportSource }: {
        transport: Transport;
        globalSource: object;
        transportSource: object;
    }): void;
}
export default Generator;
