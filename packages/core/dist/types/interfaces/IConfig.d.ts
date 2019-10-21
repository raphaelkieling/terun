import { ICommand } from "./ICommand";
export interface IConfig {
    tag: string[];
    basePath: string;
    commands: {
        [key: string]: ICommand;
    };
}
