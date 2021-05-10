import { HookFunction, ICommand } from './interfaces/ICommand';
import { Transport } from './Transport';
import { IArgs } from './interfaces/IArgs';
import IPlugin from './interfaces/IPlugin';
export declare class Command implements ICommand {
    plugins?: IPlugin[];
    args: IArgs[];
    transports: Transport[];
    hook?: HookFunction;
    constructor({ args, transports, plugins, hook }: ICommand);
}
