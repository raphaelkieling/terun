import { ICommand } from "./ICommand";
export interface IConfigExternal {
    tag?: string[];
    basePath?: string;
    commands: {
        [key: string]: ICommand;
    };
}
