import { Command } from './Command';
import { EngineType, IConfig } from './interfaces/IConfig';

export class Config implements IConfig {
    public tag: string[];
    public basePath: string;
    public engine: EngineType = EngineType.MUSTACHE;
    public commands: { [key: string]: Command };

    constructor() {
        this.basePath = '.';
        this.commands = {};
        this.tag = this.getDefaultTags();
    }

    private getDefaultTags() {
        return ['{{', '}}'];
    }
}
