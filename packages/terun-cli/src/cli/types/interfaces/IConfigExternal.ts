import { IGeneratorCommand, EngineType } from '../../../core/interfaces';

export interface IConfigExternal {
    tag?: string[];
    basePath?: string;
    engine?: EngineType;
    commands: { [key: string]: IGeneratorCommand };
}
