import { ICommand } from './ICommand';
import { ConfigReader } from '../../core/ConfigReader';
import { CommanderStatic } from 'commander';
import { error, info, MESSAGES } from '../ui';
import { exitProcess } from '../../utils/prompts';

export class AllCommand implements ICommand {
    private static getAllCommands(): void {
        const config = ConfigReader.find();

        if (!config) {
            error(MESSAGES.CONFIG_NOT_FOUND);
            return exitProcess();
        }

        try {
            const commands: string[] = Object.keys(config.commands);

            for (const command of commands) {
                info(`- ${command}`);
            }
            info('\n');
        } catch (e) {
            error(e);
            exitProcess();
        }
    }

    async handle(program: CommanderStatic): Promise<void> {
        program.command('all').description('Get all commands availables').action(AllCommand.getAllCommands);
    }
}
