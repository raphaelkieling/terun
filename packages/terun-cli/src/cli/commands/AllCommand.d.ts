import { Command } from './Command';
import { CommanderStatic } from 'commander';
export declare class AllCommand implements Command {
    private getAllCommands;
    handle(program: CommanderStatic): Promise<void>;
}
