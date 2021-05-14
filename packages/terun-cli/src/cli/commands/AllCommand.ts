import { ICommand } from './ICommand';
import { CommanderStatic } from 'commander';
import { Log, MESSAGES } from '../ui';
import { exitProcess } from '../../utils/prompts';
import { ConfigReader } from '../types/ConfigReader';

export class AllCommand implements ICommand {
    private static getAllCommands(): void {
        const config = ConfigReader.find();

        if (!config) {
            Log.error(MESSAGES.CONFIG_NOT_FOUND);
            return exitProcess();
        }

        try {
            const commands: string[] = Object.keys(config.commands);

            for (const command of commands) {
                Log.info(`- ${command}`);
            }

            Log.info('\n');
        } catch (e) {
            Log.error(e);
            exitProcess();
        }
    }

    async handle(program: CommanderStatic): Promise<void> {
        program.command('all').description('Get all commands availables').action(AllCommand.getAllCommands);
    }
}
