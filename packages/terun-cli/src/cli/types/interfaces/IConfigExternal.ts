import { ICommand } from '../../../core/types/interfaces';
import { EngineType } from '../../../core/types/interfaces/IConfig';

export interface IConfigExternal {
    tag?: string[];
    basePath?: string;
    engine?: EngineType;
    commands: { [key: string]: ICommand };
}
