import { Command } from "./domain/Command";
import rc from "rc";

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
        const conf = rc("terun", { base: 'oi' });
        console.log(conf)

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