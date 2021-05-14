import { Command } from './Command';
import { EngineType, IConfig } from './interfaces';

export class Config implements IConfig {
    tag: string[];
    basePath: string;
    engine: EngineType;
    commands: Record<string, Command>;

    constructor({ basePath, commands, engine, tag }: Partial<Config> = {}) {
        this.basePath = basePath ?? '.';
        this.commands = commands ?? {};
        this.engine = engine ?? EngineType.MUSTACHE;
        this.tag = tag ?? ['{{', '}}'];
    }
}
