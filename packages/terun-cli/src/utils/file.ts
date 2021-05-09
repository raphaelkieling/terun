import { readFileSync, writeFileSync, existsSync } from 'fs';
import * as fx from 'mkdir-recursive';
import { join } from 'path';

export function getUtf8File(path: string): string {
    return readFileSync(path, { encoding: 'utf-8' });
}

export function writeUtf8File(path: string, data: string) {
    return writeFileSync(path, data, { encoding: 'utf-8' });
}

export function existFile(path: string) {
    return existsSync(path);
}

/**
 * Create a path folders in a recursive way. Allow unix and window so.
 * @param path
 */
export function createDir(path: string): void {
    fx.mkdirSync(join(...path.split(/[\/\\]/).slice(0, -1)));
}
