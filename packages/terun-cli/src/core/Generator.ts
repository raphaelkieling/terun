import path from 'path';
import { IRenderEngine } from './types/interfaces/IRenderEngine';
import RenderFactory from './types/factories/RenderEngineFactory';
import PluginManager from './types/PluginManager';
import { ICommand, IConfig, ITransport } from './types/interfaces';
import { File } from '../utils';
import { IGeneratorHook } from './types/interfaces/IGeneratorHook';
import { GeneratorHook } from './GeneratorHooks';

type TransportParams = {
    transport: ITransport;
    source: Record<string, unknown>;
    override?: boolean;
    debug?: boolean;
};

type ResolvePathsParams = {
    transport: ITransport;
    source: Record<string, unknown>;
};

type ResolvePathsResult = { from: string; to: string };

/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
    globalConfig: IConfig;
    globalArg: Record<string, unknown>;
    render: IRenderEngine;
    pluginManager: PluginManager;
    hooks: IGeneratorHook;

    constructor(config: IConfig) {
        this.globalConfig = config;
        this.render = RenderFactory.make(this.globalConfig.engine);
        this.hooks = new GeneratorHook();
        this.pluginManager = new PluginManager();
        this.globalArg = {};
    }

    async init(): Promise<void> {
        this.installPlugins();
        this.globalArg = (await this.hooks.global.promise({})) || {};
    }

    getCommand(name: string): ICommand | undefined {
        return this.globalConfig.commands[name];
    }

    private installPlugins(): void {
        this.pluginManager.install(this.hooks);
    }

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
    async resolvePaths({ transport, source }: ResolvePathsParams): Promise<ResolvePathsResult> {
        const { basePath } = this.globalConfig;
        const localSource: Record<string, unknown> = Object.assign(source);
        const pathFrom: string = path.join(
            basePath,
            await this.render.render(transport.from, localSource, this.globalConfig.tag),
        );

        const pathTo: string = path.join(
            basePath,
            await this.render.render(transport.to, localSource, this.globalConfig.tag),
        );

        return {
            from: pathFrom,
            to: pathTo,
        };
    }

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
    async transport({ transport, source, override = false }: TransportParams): Promise<void> {
        this.hooks.configure.call(this.globalConfig);
        this.hooks.onTransport.call(transport, source);

        const localSource: Record<string, unknown> = Object.assign(source, this.globalArg);

        if (transport.validator !== null) {
            if (typeof transport.validator === 'function') {
                if (!(await transport.validator({ args: localSource }))) return;
            } else if (typeof transport.validator === 'boolean') {
                if (!transport.validator) return;
            }
        }

        const localSourcePlugin: Record<string, unknown> =
            (await this.hooks.beforeRender.promise(localSource, transport, this.render)) || localSource;

        const resolvedPaths = await this.resolvePaths({ transport, source });

        /**
         * The file need exists and command override is different that true
         */
        const fileExists = File.existFile(resolvedPaths.to);
        if (fileExists && override) {
            const overrideChoice = await this.hooks.fileExists.promise();
            if (!overrideChoice) {
                this.hooks.fileSkipped.call();
                return;
            }
        }

        // Get file content
        const fromContentFile: string = File.getUtf8File(resolvedPaths.from);

        // Render the content file with args FROM PLUGIN
        const fromContentRendered: string = await this.render.render(
            fromContentFile,
            localSourcePlugin,
            this.globalConfig.tag,
        );

        File.createDir(resolvedPaths.to);
        File.writeUtf8File(resolvedPaths.to, fromContentRendered);

        this.hooks.done.call(transport, source);
    }
}

export default Generator;
