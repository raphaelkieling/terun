import { Command } from "./Command";
import { IConfig } from "./interfaces/IConfig";
export declare class Config implements IConfig {
    tag: string[];
    basePath: string;
    engine: "mustache" | "liquid";
    commands: {
        [key: string]: Command;
    };
    constructor();
    private getDefaultTags;
}
