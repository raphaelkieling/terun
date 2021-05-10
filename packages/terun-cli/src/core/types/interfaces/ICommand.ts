import { ITransport } from './ITransport';
import { IArgs } from './IArgs';
import IPlugin from './IPlugin';
import { IGeneratorHook } from './IGeneratorHook';

export type HookFunction = (hook: IGeneratorHook) => void;

export interface ICommand {
    plugins?: IPlugin[];
    args?: IArgs[];
    transports: ITransport[];
    hook?: HookFunction;
}
