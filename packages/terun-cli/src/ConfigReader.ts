import * as path from 'path';
import * as fs from 'fs';
import { getCurrentFolderPath } from './utils';
import { Utils } from '@terun/core';

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

    static exist(): boolean {
        try {
            const configPath = path.join(getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return fs.existsSync(configPath);
        } catch (e) {
            return false;
        }
    }

    static create(data: string): void {
        try {
            const configPath = path.join(getCurrentFolderPath(), ConfigReader.CONFIG_FILE_NAME);
            return fs.writeFileSync(configPath, data, { encoding: 'utf8' });
        } catch (e) {
            Utils.Log.error(e);
        }
    }
}