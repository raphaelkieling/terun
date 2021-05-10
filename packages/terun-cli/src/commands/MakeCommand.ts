import { Command } from './Command';
import { ConfigReader } from '../ConfigReader';
import prompts from 'prompts';
import { ITransport } from '../types/interfaces/ITransport';
import { IArgs } from '../types/interfaces/IArgs';
import { canOverride, defaultConfig, exitProcess } from '../utils/prompts';
import ArgsMapper from '../mappers/ArgsMapper';
import { CommanderStatic } from 'commander';
import Generator from '../Generator';
import { Log } from '../utils';
import { ConfigMapper } from '../mappers/ConfigMapper';

type MakeCommandParams = {
    override: boolean;
    debug: boolean;
    commandName: string;
};
export class MakeCommand implements Command {
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

    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('make <commandName>')
            .description('Execute a command')
            .option('-o, --override', 'Override the file without confirm')
            .option('-d, --debug', 'Debug showing some important template resolutions')
            .action(async (commandName: string, args: MakeCommandParams) => {
                try {
                    const config = ConfigReader.find();

                    if (!config) {
                        Log.error('Config file terun.js not found');
                        return exitProcess();
                    }

                    const configExternal = ConfigMapper.fromConfigExternal(config);
                    const generator = new Generator(configExternal);
                    const command = generator.getCommand(commandName);

                    if (!command) {
                        Log.error(`Command [${commandName}] not found on config`);
                        return exitProcess();
                    }

                    // Start the hook system into the command
                    if (command.hook && typeof command.hook === 'function') command.hook(generator.hooks);

                    generator.hooks.fileExists.tapPromise('CLI', () => {
                        return canOverride();
                    });

                    generator.hooks.fileSkipped.tap('CLI', () => {
                        Log.warn('Relax, file skyped');
                    });

                    generator.hooks.done.tap('CLI', () => {
                        Log.success('File transported with success!');
                    });

                    if (command.plugins) {
                        for (const plugin of command.plugins) {
                            generator.pluginManager.addPlugin(plugin);
                        }
                    }

                    generator.hooks.global.tapPromise('CLI', async () => {
                        if (command.args?.length) {
                            Log.log('[Global arguments]');
                        }

                        command.args = ArgsMapper.fromList(command.args || []);
                        return await this.getArgsWithPrompts(command.args);
                    });

                    await generator.init();

                    const transports: ITransport[] = command.transports;

                    for (const transport of transports) {
                        Log.log(`[process]: ${transport.name || transport.from}`);

                        transport.args = ArgsMapper.fromList(transport.args || []);

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
                    Log.error(e);
                }
            });
    }
}
