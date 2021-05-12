import { IStorage } from './interfaces/IStorage';
import { createDir, existFile, getUtf8File, writeUtf8File } from '../utils/file';

export class GeneratorStorage implements IStorage {
    read(path: string): string {
        return getUtf8File(path);
    }

    write(path: string, content: string): void {
        createDir(path);
        writeUtf8File(path, content);
    }

    exist(path: string): boolean {
        return existFile(path);
    }
}
