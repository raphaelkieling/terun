import { ICommand } from "./ICommand";
export default interface IConfigFile {
    basePath: string;
    commands: {
        [key: string]: ICommand[];
    };
}
