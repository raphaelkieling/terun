import { ITransport } from "./ITransport";
import { IArgs } from "./IArgs";
import IPlugin from './IPlugin';
import { Hook } from "tapable";
export declare type HookFunction = (hook: Hook) => void;
export interface ICommand {
    name?: string;
    plugins?: IPlugin[];
    args?: IArgs[];
    transports: ITransport[];
    hook?: HookFunction;
}
