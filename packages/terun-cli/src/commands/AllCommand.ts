import { Command } from './Command';
import { Utils } from '@terun/core';
import { ConfigReader } from '../ConfigReader';
import chalk from 'chalk';
import { CommanderStatic } from 'commander';

export class AllCommand implements Command {
    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('all')
            .description('Get all commands availables')
            .action(async () => {
                const config = ConfigReader.find();

                if (!config) {
                    Utils.Log.error('Config file terun.js not found');
                    return;
                }

                try {
                    const commands: string[] = Object.keys(config.commands);
                    for (const command of commands) {
                        console.log(chalk.green(`- ${command}`));
                    }
                    console.log('\n');
                } catch (e) {
                    Utils.Log.error(e);
                }
            });
    }
}
