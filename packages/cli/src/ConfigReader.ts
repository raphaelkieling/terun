import * as path from 'path';
import { getCurrentFolderPath } from './utils';
import { Utils } from '@terun/core'

export class ConfigReader {
    static CONFIG_FILE_NAME = 'terun.js';

    static find() {
        try {
            const configPath = path.join(getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return Utils.File.getUtf8File(configPath);
        } catch (err) {
            return null;
        }
    }
}