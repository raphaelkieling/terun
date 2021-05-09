import { ITransport } from './ITransport';
import { IArgs } from './IArgs';
import IPlugin from './IPlugin';
import { DefaultHooks } from '../../Generator';

export type HookFunction = (hook: DefaultHooks) => void;

export interface ICommand {
    plugins?: IPlugin[];
    args?: IArgs[];
    transports: ITransport[];
    hook?: HookFunction;
}
