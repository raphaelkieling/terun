import { Command } from "./Command";
export declare class AllCommand extends Command {
    private config;
    constructor();
    configure(): void;
    execute(): Promise<any>;
}
