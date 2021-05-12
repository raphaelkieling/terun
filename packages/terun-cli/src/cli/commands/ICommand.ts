import { CommanderStatic } from 'commander';

export interface ICommand {
    handle(program: CommanderStatic): void;
}
