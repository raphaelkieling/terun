import { ICommand } from "./interfaces/ICommand";
import { Transport } from "./Transport";
import { IArgs } from "./interfaces/IArgs";

export class Command implements ICommand {
  public name?: string;
  public args: IArgs[];
  public transports: Transport[];

  constructor({ name, args, transports }: ICommand) {
    this.name = name;
    this.args = args;
    this.transports = transports.map((item) => new Transport(item));
  }
}
