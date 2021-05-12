import { HookFunction, IGeneratorCommand } from './interfaces';
import { IArgs, ITransportItem } from './interfaces';
import IPlugin from './interfaces/IPlugin';

export class Command implements IGeneratorCommand {
    public plugins?: IPlugin[];
    public args: IArgs[];
    public transports: ITransportItem[];
    public hook?: HookFunction;

    constructor({ args, transports, plugins, hook }: IGeneratorCommand) {
        this.args = args || [];
        this.hook = hook;
        this.plugins = plugins || [];
        this.transports = transports;
    }
}
