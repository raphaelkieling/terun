import { ICommand } from './ICommand';
export declare enum EngineType {
    MUSTACHE = "mustache",
    LIQUID = "liquid"
}
export interface IConfig {
    tag: string[];
    basePath: string;
    engine: EngineType;
    commands: Record<string, ICommand>;
}
