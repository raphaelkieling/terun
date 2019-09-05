import { ITemplateArgs } from "./interfaces/ITemplateArgs";
import { ITransport } from "./interfaces/ITransport";

export class Transport implements ITransport {
  public name?: string;
  public from: string;
  public to: string;
  public args: ITemplateArgs[];

  constructor({ from, to, args, name }: ITransport) {
    this.from = from;
    this.to = to;
    this.args = args || [];
    this.name = name;
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
