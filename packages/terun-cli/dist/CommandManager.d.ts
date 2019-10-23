import { Command } from './commands/Command';
export default class CommandManager {
    private commands;
    constructor();
    addCommand(command: Command): void;
    execute(object: any): Promise<any>;
}
