import { IGeneratorCommand } from './IGeneratorCommand';

export enum EngineType {
    MUSTACHE = 'mustache',
    LIQUID = 'liquid',
}

export interface IConfig {
    tag: string[];
    basePath: string;
    engine: EngineType;
    commands: Record<string, IGeneratorCommand>;
}
