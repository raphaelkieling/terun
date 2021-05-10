"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const RenderEngineFactory_1 = __importDefault(require("./types/factories/RenderEngineFactory"));
const PluginManager_1 = __importDefault(require("./types/PluginManager"));
const utils_1 = require("../utils");
const GeneratorHooks_1 = require("./GeneratorHooks");
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
class Generator {
    constructor(config) {
        this.globalConfig = config;
        this.render = RenderEngineFactory_1.default.make(this.globalConfig.engine);
        this.hooks = new GeneratorHooks_1.GeneratorHook();
        this.pluginManager = new PluginManager_1.default();
        this.globalArg = {};
    }
    async init() {
        this.installPlugins();
        this.globalArg = (await this.hooks.global.promise({})) || {};
    }
    getCommand(name) {
        return this.globalConfig.commands[name];
    }
    installPlugins() {
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
    async resolvePaths({ transport, source }) {
        const { basePath } = this.globalConfig;
        const localSource = Object.assign(source);
        const pathFrom = path_1.default.join(basePath, await this.render.render(transport.from, localSource, this.globalConfig.tag));
        const pathTo = path_1.default.join(basePath, await this.render.render(transport.to, localSource, this.globalConfig.tag));
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
    async transport({ transport, source, override = false }) {
        this.hooks.configure.call(this.globalConfig);
        this.hooks.onTransport.call(transport, source);
        const localSource = Object.assign(source, this.globalArg);
        if (transport.validator !== null) {
            if (typeof transport.validator === 'function') {
                if (!(await transport.validator({ args: localSource })))
                    return;
            }
            else if (typeof transport.validator === 'boolean') {
                if (!transport.validator)
                    return;
            }
        }
        const localSourcePlugin = (await this.hooks.beforeRender.promise(localSource, transport, this.render)) || localSource;
        const resolvedPaths = await this.resolvePaths({ transport, source });
        /**
         * The file need exists and command override is different that true
         */
        const fileExists = utils_1.File.existFile(resolvedPaths.to);
        if (fileExists && override) {
            const overrideChoice = await this.hooks.fileExists.promise();
            if (!overrideChoice) {
                this.hooks.fileSkipped.call();
                return;
            }
        }
        // Get file content
        const fromContentFile = utils_1.File.getUtf8File(resolvedPaths.from);
        // Render the content file with args FROM PLUGIN
        const fromContentRendered = await this.render.render(fromContentFile, localSourcePlugin, this.globalConfig.tag);
        utils_1.File.createDir(resolvedPaths.to);
        utils_1.File.writeUtf8File(resolvedPaths.to, fromContentRendered);
        this.hooks.done.call(transport, source);
    }
}
exports.default = Generator;
