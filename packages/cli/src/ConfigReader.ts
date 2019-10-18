import * as path from 'path';
import { getCurrentFolderPath } from './utils';
export class ConfigReader {
    static CONFIG_FILE_NAME = 'terun.js';

    static find() {
        try {
            const configPath = path.join(getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return require(configPath);
        } catch (err) {
            return null;
        }
    }
}