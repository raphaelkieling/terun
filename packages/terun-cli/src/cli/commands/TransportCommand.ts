import { ICommand } from './ICommand';
import prompts from 'prompts';
import { CommanderStatic } from 'commander';
import { ConfigMapper } from '../types/mappers/ExternalConfigMapper';
import { IArgs, IGeneratorCommand } from '../../core/interfaces';
import { MESSAGES, Log, Prompts } from '../ui';
import { GeneratorFactory } from '../../core/factories/GeneratorFactory';
import Generator from '../../core/Generator';
import { ConfigReader } from '../types/ConfigReader';

type TransportCommandArgs = {
    override: boolean;
    debug: boolean;
};

export class TransportCommand implements ICommand {
    /**
     * Resolve global and local argumentos using the prompts
     *
     * @param {string[]} args
     * @example
     *  const args = ["test", "name"]
     *  const result = await getArgsWithPrompts(args)
     *  // output: { test: "x", name: "y" }
     *
     * @returns {object}
     */
    async getArgsWithPrompts(args: IArgs[]): Promise<Record<string, unknown>> {
        return args.reduce(async (acc, arg) => {
            const result = await prompts(arg, Prompts.defaultConfig);
            return {
                ...result,
                ...acc,
            };
        }, {});
    }

    async initTransport(commandName: string, args: TransportCommandArgs): Promise<void> {
        try {
            // Load the configuration
            const config = ConfigReader.find();
            if (!config) {
                Log.error(MESSAGES.CONFIG_NOT_FOUND);
                return Prompts.exitProcess();
            }

            // Map configuration and start generator
            const configExternal = ConfigMapper.toInternalConfig(config);
            const generator = GeneratorFactory.make(configExternal);

            // Confirm that the command exist
            const command = generator.getCommand(commandName);
            if (!command) {
                Log.error(MESSAGES.COMMAND_NOT_FOUND(commandName));
                return Prompts.exitProcess();
            }

            // Start the hook system
            this.listenForGeneratorHooks(generator, command);

            await generator.initCommand(commandName);

            for (const transport of command.transports) {
                Log.success(`[process]: ${transport.name || transport.from}`);

                const transportSource = await this.getArgsWithPrompts(transport.args ?? []);

                await generator.transport({
                    source: transportSource,
                    transport,
                    override: !args.override,
                    debug: args.debug,
                });
            }
        } catch (e) {
            Log.error(e);
            Prompts.exitProcess();
        }
    }

    private listenForGeneratorHooks(generator: Generator, command: IGeneratorCommand) {
        if (command.hook && typeof command.hook === 'function') command.hook(generator.hooks);

        generator.hooks.fileExists.tapPromise('CLI', () => {
            return Prompts.canOverride();
        });

        generator.hooks.fileSkipped.tap('CLI', () => {
            Log.warn(MESSAGES.FILE_SKYPED);
        });

        generator.hooks.done.tap('CLI', () => {
            Log.success(MESSAGES.DONE_TRANSPORT_SUCCESS);
        });

        generator.hooks.global.tapPromise('CLI', async () => {
            if (command.args?.length) {
                Log.log('[Global arguments]');
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
            .action((commandName: string, args: TransportCommandArgs) => this.initTransport(commandName, args));
    }
}
