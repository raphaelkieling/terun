import path from 'path';
import { IRenderEngine } from './interfaces';
import PluginManager from './PluginManager';
import { IGeneratorCommand, IConfig, ITransportItem } from './interfaces';
import { IGeneratorHook } from './interfaces/IGeneratorHook';
import { IStorage } from './interfaces/IStorage';
import { NotFoundFileError } from './exceptions/NotFoundFile';

type SourceData = Record<string, unknown>;

type TransportParams = {
    transport: ITransportItem;
    source: SourceData;
    override?: boolean;
    debug?: boolean;
};

type ResolvePathsParams = {
    transport: ITransportItem;
    source: SourceData;
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
export default class Generator {
    config: IConfig;
    globalArg: SourceData;
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
    async resolveFromToUsingRender({ transport, source }: ResolvePathsParams): Promise<ResolvePathsResult> {
        const { basePath } = this.config;
        const localSource: SourceData = Object.assign(source);
        const pathFrom = await this.resolveUniquePathUsingRender(basePath, transport.from, localSource);
        const pathTo = await this.resolveUniquePathUsingRender(basePath, transport.to, localSource);

        return {
            from: pathFrom,
            to: pathTo,
        };
    }

    private async resolveUniquePathUsingRender(
        basePath: string,
        filePath: string,
        source: SourceData,
    ): Promise<string> {
        return path.join(basePath, await this.render.render(filePath, source, this.config.tag));
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

        const localSource: SourceData = Object.assign(source, this.globalArg);

        if (transport.validator && typeof transport.validator === 'function') {
            const isValid = await transport.validator({ args: localSource });
            if (!isValid) return;
        }

        const localSourcePlugin: SourceData =
            (await this.hooks.beforeRender.promise(localSource, transport, this.render)) || localSource;

        // Resolve from, to using the template render
        const { from, to } = await this.resolveFromToUsingRender({ transport, source });

        // Check existing files
        const fileFromExist = this.storage.exist(from);
        if (!fileFromExist) throw new NotFoundFileError(from);

        const fileToExist = this.storage.exist(to);
        if (fileToExist && override) {
            const overrideChoice = await this.hooks.fileExists.promise();
            if (!overrideChoice) {
                this.hooks.fileSkipped.call();
                return;
            }
        }

        const fromContentFile: string = await this.storage.read(from);

        // Render the content file with args from plugin
        const fromContentRendered: string = await this.render.render(
            fromContentFile,
            localSourcePlugin,
            this.config.tag,
        );

        this.storage.write(to, fromContentRendered);
        this.hooks.done.call(transport, source);
    }
}
