import { IRenderEngine } from './types/interfaces/IRenderEngine';
import PluginManager from './types/PluginManager';
import { ICommand, IConfig, ITransport } from './types/interfaces';
import { IGeneratorHook } from './types/interfaces/IGeneratorHook';
declare type TransportParams = {
    transport: ITransport;
    source: Record<string, unknown>;
    override?: boolean;
    debug?: boolean;
};
declare type ResolvePathsParams = {
    transport: ITransport;
    source: Record<string, unknown>;
};
declare type ResolvePathsResult = {
    from: string;
    to: string;
};
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
declare class Generator {
    globalConfig: IConfig;
    globalArg: Record<string, unknown>;
    render: IRenderEngine;
    pluginManager: PluginManager;
    hooks: IGeneratorHook;
    constructor(config: IConfig);
    init(): Promise<void>;
    getCommand(name: string): ICommand | undefined;
    private installPlugins;
    /**
     * @typedef
     *
     * Resolve from and to properties. It's because the path can have
     * some properties, for example:
     *
     * @example
     *  const transport = {
     *    from: "from/path/{{name}}",
     *    to: "to/path/{{name}}";
     *  }
     *
     *  const source = {
     *    name: "example"
     *  }
     *
     *  this.resolvePaths({ transport, source })
     *
     *  Output: { from: "from/path/example", to: "to/path/example" }
     *
     * @param {object} params
     * @param {string} params.from
     * @param {string} params.to
     *
     * @returns {Promise<{ from: string, to: string }>}
     */
    resolvePaths({ transport, source }: ResolvePathsParams): Promise<ResolvePathsResult>;
    /**
     * Transport a template to a file
     *
     * @param {Object} param
     * @param {Object} param.transport
     * @param {Object} param.source
     * @param {boolean} param.override
     * @param {boolean} param.debug
     *
     * @returns {Promise<void>}
     */
    transport({ transport, source, override }: TransportParams): Promise<void>;
}
export default Generator;
