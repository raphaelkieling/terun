import { Command } from "./Command";
export declare class InitCommand extends Command {
    constructor();
    configure(): void;
    execute(): Promise<any>;
}
