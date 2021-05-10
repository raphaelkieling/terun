import { Command } from './Command';
import { ConfigReader } from '../../core/ConfigReader';
import prompts from 'prompts';
import { canOverride, defaultConfig, exitProcess } from '../../utils/prompts';
import ArgsMapper from '../types/mappers/ArgsMapper';
import { CommanderStatic } from 'commander';
import Generator from '../../core/Generator';
import { ConfigMapper } from '../types/mappers/ExternalConfigMapper';
import { IArgs, ITransport } from '../../core/types/interfaces';
import { error, log, success, warn } from '../ui';

type TransportCommandArgs = {
    override: boolean;
    debug: boolean;
    commandName: string;
};

export class TransportCommand implements Command {
    private async getArgsWithPrompts(args: IArgs[]): Promise<Record<string, unknown>> {
        let params: Record<string, unknown> = {};
        for (const arg of args) {
            const result = await prompts(arg, defaultConfig);

            params = {
                ...params,
                ...result,
            };
        }
        return params;
    }

    private async executeAction(commandName: string, args: TransportCommandArgs): Promise<void> {
        {
            try {
                const config = ConfigReader.find();

                if (!config) {
                    error('Config file terun.js not found');
                    return exitProcess();
                }

                const configExternal = ConfigMapper.toInternalConfig(config);
                const generator = new Generator(configExternal);
                const command = generator.getCommand(commandName);

                if (!command) {
                    error(`Command [${commandName}] not found on config`);
                    return exitProcess();
                }

                // Start the hook system into the command
                if (command.hook && typeof command.hook === 'function') command.hook(generator.hooks);

                generator.hooks.fileExists.tapPromise('CLI', () => {
                    return canOverride();
                });

                generator.hooks.fileSkipped.tap('CLI', () => {
                    warn('Relax, file skyped');
                });

                generator.hooks.done.tap('CLI', () => {
                    success('File transported with success!');
                });

                if (command.plugins) {
                    for (const plugin of command.plugins) {
                        generator.pluginManager.addPlugin(plugin);
                    }
                }

                generator.hooks.global.tapPromise('CLI', async () => {
                    if (command.args?.length) {
                        log('[Global arguments]');
                    }

                    command.args = ArgsMapper.fromList(command.args || []);
                    return await this.getArgsWithPrompts(command.args);
                });

                await generator.init();

                const transports: ITransport[] = command.transports;

                for (const transport of transports) {
                    transport.args = ArgsMapper.fromList(transport.args || []);
                    log(`[process]: ${transport.name || transport.from}`);

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
            } catch (e) {
                error(e);
                exitProcess();
            }
        }
    }

    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('transport <commandName>')
            .description('Transport files')
            .option('-o, --override', 'Override the file without confirm')
            .option('-d, --debug', 'Debug showing some important template resolutions')
            .action(this.executeAction);
    }
}
