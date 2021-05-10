import { Command } from './Command';
import { ConfigReader } from '../ConfigReader';
import { CommanderStatic } from 'commander';
import { Log } from '../utils';
import { exitProcess } from '../utils/prompts';

export class AllCommand implements Command {
    private getAllCommands(): void {
        const config = ConfigReader.find();

        if (!config) {
            Log.error('Config file terun.js not found');
            return exitProcess();
        }

        try {
            const commands: string[] = Object.keys(config.commands);

            for (const command of commands) {
                Log.info(`- ${command}`);
            }
            console.log('\n');
        } catch (e) {
            Log.error(e);
        }
    }

    async handle(program: CommanderStatic): Promise<void> {
        program.command('all').description('Get all commands availables').action(this.getAllCommands);
    }
}
