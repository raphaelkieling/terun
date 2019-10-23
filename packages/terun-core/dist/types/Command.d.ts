import { ICommand } from "./interfaces/ICommand";
import { Transport } from "./Transport";
import { IArgs } from "./interfaces/IArgs";
import IPlugin from './interfaces/IPlugin';
export declare class Command implements ICommand {
    name?: string;
    plugins?: IPlugin[];
    args: IArgs[];
    transports: Transport[];
    constructor({ name, args, transports, plugins }: ICommand);
}
