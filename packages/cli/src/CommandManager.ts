import { Command } from "./domain/Command";

export default class CommandManager {
    private commands: Map<string, Command>;

    constructor() {
        this.commands = new Map();
    }

    addCommand(command: Command) {
        this.commands.set(command.name, command);
    }

    async execute(object: object) {
        const keys = Object.keys(object);

        for (let key of keys) {
            if (this.commands.has(key)) {
                let command = this.commands.get(key)
                if (!command) return;

                await command.configure();
                await command.execute();
            }
        }
    }
}