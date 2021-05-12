import { ITransportItem } from './ITransportItem';
import { IArgs } from './IArgs';
import IPlugin from './IPlugin';
import { IGeneratorHook } from './IGeneratorHook';

export type HookFunction = (hook: IGeneratorHook) => void;

export interface IGeneratorCommand {
    plugins?: IPlugin[];
    args?: IArgs[];
    transports: ITransportItem[];
    hook?: HookFunction;
}
