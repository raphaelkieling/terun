import { ICommand } from "./interfaces/ICommand";
import { Transport } from "./Transport";
import { IArgs } from "./interfaces/IArgs";
import IPlugin from './interfaces/IPlugin';

export class Command implements ICommand {
  public plugins?: IPlugin[];
  public args: IArgs[];
  public transports: Transport[];
  public hook: any;

  constructor({ args, transports, plugins, hook }: ICommand) {
    this.args = args || [];
    this.hook = hook;
    this.plugins = plugins || [];
    this.transports = transports.map((item) => new Transport(item));
  }
}
