import { Command } from './Command';
import { CommanderStatic } from 'commander';
export declare class InitCommand implements Command {
    handle(program: CommanderStatic): Promise<void>;
}
