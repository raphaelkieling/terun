import { ICommand } from "./interfaces/ICommand";
import { Transport } from "./Transport";
import { IArgs } from "./interfaces/IArgs";
import IPlugin from './interfaces/IPlugin';

export class Command implements ICommand {
  public name?: string;
  public plugins?: IPlugin[];
  public args: IArgs[];
  public transports: Transport[];

  constructor({ name, args, transports, plugins }: ICommand) {
    this.name = name;
    this.args = args || [];
    this.plugins = plugins || [];
    this.transports = transports.map((item) => new Transport(item));
  }
}
