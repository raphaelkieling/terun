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
    /**
     *
     * Init the transport with a command name, it's is a entry
     * point to generator to create files.
     *
     * ```js
     * commands:{
     *    makeCrud: {
     *      ...
     *    }
     * }
     * ```
     *
     * Use commandName param with "makeCrud".
     *
     * @param commandName string with name key
     */
    initTransport(commandName: string): Promise<void>;
    transportByCommand(command: Command): Promise<void>;
    getCommand(name: string): Command | undefined;
    transport({ transport, globalSource, }: {
        transport: Transport;
        globalSource: object;
    }): void;
}
export default Generator;
