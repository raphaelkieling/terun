import { Command } from './commands/Command';

export default class CommandManager {
    private commands: Map<string, Command>;

    constructor() {
        this.commands = new Map();
    }

    addCommand(command: Command): void {
        this.commands.set(command.name, command);
    }

    async execute(object: any): Promise<any> {
        const keys = Object.keys(object);

        for (let key of keys) {
            if (this.commands.has(key)) {
                const command = this.commands.get(key)
                if (!command) return;

                await command.configure(object);
                command.setArgs(object);
                await command.execute();
            }
        }
    }
}