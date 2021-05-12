import { ICommand } from './ICommand';
import { ConfigReader } from '../../core/ConfigReader';
import prompts from 'prompts';
import { canOverride, defaultConfig, exitProcess } from '../../utils/prompts';
import { CommanderStatic } from 'commander';
import { ConfigMapper } from '../types/mappers/ExternalConfigMapper';
import { IArgs, IGeneratorCommand } from '../../core/interfaces';
import { error, log, MESSAGES, success, warn } from '../ui';
import { GeneratorFactory } from '../../core/factories/GeneratorFactory';
import Generator from '../../core/Generator';

type TransportCommandArgs = {
    override: boolean;
    debug: boolean;
    commandName: string;
};

export class TransportCommand implements ICommand {
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
                    error(MESSAGES.CONFIG_NOT_FOUND);
                    return exitProcess();
                }

                const configExternal = ConfigMapper.toInternalConfig(config);
                const generator = GeneratorFactory.make(configExternal);
                const command = generator.getCommand(commandName);

                if (!command) {
                    error(MESSAGES.COMMAND_NOT_FOUND(commandName));
                    return exitProcess();
                }

                // Add the plugins
                if (command.plugins) {
                    for (const plugin of command.plugins) {
                        generator.pluginManager.addPlugin(plugin);
                    }
                }

                // Start the hook system
                this.listenForGeneratorHooks(generator, command);

                await generator.init();

                for (const transport of command.transports) {
                    log(`[process]: ${transport.name || transport.from}`);

                    const transportSource = await this.getArgsWithPrompts(transport.args ?? []);

                    await generator.transport({
                        source: transportSource,
                        transport,
                        override: !args.override,
                        debug: args.debug,
                    });
                }
            } catch (e) {
                error(e);
                exitProcess();
            }
        }
    }

    private listenForGeneratorHooks(generator: Generator, command: IGeneratorCommand) {
        if (command.hook && typeof command.hook === 'function') command.hook(generator.hooks);

        generator.hooks.fileExists.tapPromise('CLI', () => {
            return canOverride();
        });

        generator.hooks.fileSkipped.tap('CLI', () => {
            warn(MESSAGES.FILE_SKYPED);
        });

        generator.hooks.done.tap('CLI', () => {
            success(MESSAGES.DONE_TRANSPORT_SUCCESS);
        });

        generator.hooks.global.tapPromise('CLI', async () => {
            if (command.args?.length) {
                log('[Global arguments]');
            }

            if (command.args) return await this.getArgsWithPrompts(command.args);

            return {};
        });
    }

    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('transport <commandName>')
            .description('TransportItem files')
            .option('-o, --override', 'Override the file without confirm')
            .option('-d, --debug', 'Debug showing some important template resolutions')
            .action((commandName: string, args: TransportCommandArgs) => this.executeAction(commandName, args));
    }
}
