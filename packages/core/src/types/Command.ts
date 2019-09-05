import { ICommand } from "./interfaces/ICommand";
import { ITemplateArgs } from "./interfaces/ITemplateArgs";
import { Transport } from "./Transport";

export class Command implements ICommand {
  public name?: string;
  public args: ITemplateArgs[];
  public transports: Transport[];

  constructor({ name, args, transports }: ICommand) {
    this.name = name;
    this.args = args;
    this.transports = transports.map((item) => new Transport(item));
  }

  public getSource(): object {
    let params = {};

    for (const arg of this.args) {
      params = Object.assign(params, {
        [arg.variable]: arg.value,
      });
    }

    return params;
  }
}
