import { Command } from "./Command";
export declare class MakeCommand extends Command {
    private config;
    constructor();
    configure(): void;
    private getArgsWithPrompts;
    execute(): Promise<any>;
}
