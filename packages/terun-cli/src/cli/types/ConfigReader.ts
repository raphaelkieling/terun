import * as path from 'path';
import { File } from '../../utils';
import { Prompts } from '../ui';
import { IConfigExternal } from './interfaces/IConfigExternal';

export class ConfigReader {
    static CONFIG_FILE_NAME = 'terun.js';

    static find(): IConfigExternal | null {
        try {
            const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return require(configPath);
        } catch (err) {
            return null;
        }
    }

    static exist(): boolean {
        try {
            const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return File.existFile(configPath);
        } catch (err) {
            return false;
        }
    }

    static create(data: string): void {
        const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
        return File.writeUtf8File(configPath, data);
    }
}
