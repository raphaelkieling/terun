"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportCommand = void 0;
const ConfigReader_1 = require("../../core/ConfigReader");
const prompts_1 = __importDefault(require("prompts"));
const prompts_2 = require("../../utils/prompts");
const ArgsMapper_1 = __importDefault(require("../types/mappers/ArgsMapper"));
const Generator_1 = __importDefault(require("../../core/Generator"));
const ExternalConfigMapper_1 = require("../types/mappers/ExternalConfigMapper");
const ui_1 = require("../ui");
class TransportCommand {
    async getArgsWithPrompts(args) {
        let params = {};
        for (const arg of args) {
            const result = await prompts_1.default(arg, prompts_2.defaultConfig);
            params = {
                ...params,
                ...result,
            };
        }
        return params;
    }
    async executeAction(commandName, args) {
        {
            try {
                const config = ConfigReader_1.ConfigReader.find();
                if (!config) {
                    ui_1.error('Config file terun.js not found');
                    return prompts_2.exitProcess();
                }
                const configExternal = ExternalConfigMapper_1.ConfigMapper.toInternalConfig(config);
                const generator = new Generator_1.default(configExternal);
                const command = generator.getCommand(commandName);
                if (!command) {
                    ui_1.error(`Command [${commandName}] not found on config`);
                    return prompts_2.exitProcess();
                }
                // Start the hook system into the command
                if (command.hook && typeof command.hook === 'function')
                    command.hook(generator.hooks);
                generator.hooks.fileExists.tapPromise('CLI', () => {
                    return prompts_2.canOverride();
                });
                generator.hooks.fileSkipped.tap('CLI', () => {
                    ui_1.warn('Relax, file skyped');
                });
                generator.hooks.done.tap('CLI', () => {
                    ui_1.success('File transported with success!');
                });
                if (command.plugins) {
                    for (const plugin of command.plugins) {
                        generator.pluginManager.addPlugin(plugin);
                    }
                }
                generator.hooks.global.tapPromise('CLI', async () => {
                    if (command.args?.length) {
                        ui_1.log('[Global arguments]');
                    }
                    command.args = ArgsMapper_1.default.fromList(command.args || []);
                    return await this.getArgsWithPrompts(command.args);
                });
                await generator.init();
                const transports = command.transports;
                for (const transport of transports) {
                    transport.args = ArgsMapper_1.default.fromList(transport.args || []);
                    ui_1.log(`[process]: ${transport.name || transport.from}`);
                    const transportSource = await this.getArgsWithPrompts(transport.args ?? []);
                    const defaultIsOverride = args.override !== true;
                    const defaultDebug = args.debug === true;
                    await generator.transport({
                        source: transportSource,
                        transport,
                        override: defaultIsOverride,
                        debug: defaultDebug,
                    });
                }
            }
            catch (e) {
                ui_1.error(e);
                prompts_2.exitProcess();
            }
        }
    }
    async handle(program) {
        program
            .command('transport <commandName>')
            .description('Transport files')
            .option('-o, --override', 'Override the file without confirm')
            .option('-d, --debug', 'Debug showing some important template resolutions')
            .action(this.executeAction);
    }
}
exports.TransportCommand = TransportCommand;
