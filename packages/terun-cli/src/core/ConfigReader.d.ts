import { IConfigExternal } from '../cli/types/interfaces/IConfigExternal';
export declare class ConfigReader {
    static CONFIG_FILE_NAME: string;
    static find(): IConfigExternal | null;
    static exist(): boolean;
    static create(data: string): void;
}
