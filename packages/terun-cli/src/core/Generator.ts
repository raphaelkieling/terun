import path from 'path';
import { IRenderEngine } from './interfaces';
import PluginManager from './PluginManager';
import { IGeneratorCommand, IConfig, ITransportItem } from './interfaces';
import { File } from '../utils';
import { IGeneratorHook } from './interfaces/IGeneratorHook';
import { IStorage } from './interfaces/IStorage';

type TransportParams = {
    transport: ITransportItem;
    source: Record<string, unknown>;
    override?: boolean;
    debug?: boolean;
};

type ResolvePathsParams = {
    transport: ITransportItem;
    source: Record<string, unknown>;
};

type ResolvePathsResult = { from: string; to: string };

type GeneratorParams = {
    config: IConfig;
    render: IRenderEngine;
    hooks: IGeneratorHook;
    storage: IStorage;
};

/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
    config: IConfig;
    globalArg: Record<string, unknown>;
    render: IRenderEngine;
    pluginManager: PluginManager;
    hooks: IGeneratorHook;
    storage: IStorage;

    constructor({ config, render, hooks, storage }: GeneratorParams) {
        this.config = config;
        this.render = render;
        this.hooks = hooks;
        this.storage = storage;
        this.pluginManager = new PluginManager();
        this.globalArg = {};
    }

    async initCommand(commandName: string): Promise<void> {
        const command = this.getCommand(commandName);

        // Add the plugins
        if (command?.plugins) {
            for (const plugin of command.plugins) {
                this.pluginManager.addPlugin(plugin);
            }
        }

        this.installPlugins();
        this.globalArg = (await this.hooks.global.promise({})) || {};
    }

    getCommand(name: string): IGeneratorCommand | undefined {
        return this.config.commands[name];
    }

    private installPlugins(): void {
        this.pluginManager.install(this.hooks);
    }

    /**
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
     * @return {object} params
     * @return {string} params.from
     * @return {string} params.to
     *
     * @returns {Promise<{ from: string, to: string }>}
     */
    async resolvePaths({ transport, source }: ResolvePathsParams): Promise<ResolvePathsResult> {
        const { basePath } = this.config;
        const localSource: Record<string, unknown> = Object.assign(source);
        const pathFrom: string = path.join(
            basePath,
            await this.render.render(transport.from, localSource, this.config.tag),
        );

        const pathTo: string = path.join(
            basePath,
            await this.render.render(transport.to, localSource, this.config.tag),
        );

        return {
            from: pathFrom,
            to: pathTo,
        };
    }

    /**
     * TransportItem a template to a file
     *
     * @param {Object} param
     * @param {Object} param.transport
     * @param {Object} param.source
     * @param {boolean} param.override
     *
     * @returns {Promise<void>}
     */
    async transport({ transport, source, override = false }: TransportParams): Promise<void> {
        this.hooks.configure.call(this.config);
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
        const fileExists = this.storage.exist(resolvedPaths.to);
        if (fileExists && override) {
            const overrideChoice = await this.hooks.fileExists.promise();
            if (!overrideChoice) {
                this.hooks.fileSkipped.call();
                return;
            }
        }

        // Get file content
        const fromContentFile: string = this.storage.read(resolvedPaths.from);

        // Render the content file with args FROM PLUGIN
        const fromContentRendered: string = await this.render.render(
            fromContentFile,
            localSourcePlugin,
            this.config.tag,
        );

        this.storage.write(resolvedPaths.to, fromContentRendered);
        this.hooks.done.call(transport, source);
    }
}

export default Generator;
