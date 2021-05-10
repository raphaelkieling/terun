import { Command } from './Command';
import { EngineType, IConfig } from './interfaces/IConfig';
export declare class Config implements IConfig {
    tag: string[];
    basePath: string;
    engine: EngineType;
    commands: Record<string, Command>;
    constructor();
}
