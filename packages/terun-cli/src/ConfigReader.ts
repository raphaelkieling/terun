import * as path from 'path';
import { IConfigExternal } from './types/interfaces';
import { File, Log, Prompts } from './utils';

export class ConfigReader {
    static CONFIG_FILE_NAME = 'terun.js';

    static find(): IConfigExternal | null {
        try {
            const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return require(configPath);
        } catch (err) {
            Log.error(err);
            return null;
        }
    }

    static exist(): boolean {
        try {
            const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return File.existFile(configPath);
        } catch (err) {
            Log.error(err);
            return false;
        }
    }

    static create(data: string): void {
        try {
            const configPath = path.join(Prompts.getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return File.writeUtf8File(configPath, data);
        } catch (err) {
            Log.error(err);
        }
    }
}
