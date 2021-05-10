import { Command } from './Command';
import { EngineType, IConfig } from './interfaces/IConfig';

export class Config implements IConfig {
    tag: string[];
    basePath: string;
    engine: EngineType;
    commands: Record<string, Command>;

    constructor() {
        this.basePath = '.';
        this.commands = {};
        this.engine = EngineType.MUSTACHE;
        this.tag = ['{{', '}}'];
    }
}
