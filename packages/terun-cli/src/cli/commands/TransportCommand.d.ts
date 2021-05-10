import { Command } from './Command';
import { CommanderStatic } from 'commander';
export declare class TransportCommand implements Command {
    private getArgsWithPrompts;
    private executeAction;
    handle(program: CommanderStatic): Promise<void>;
}
