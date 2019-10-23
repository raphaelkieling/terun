import { IArgs } from "./interfaces/IArgs";
import { ITransport } from "./interfaces/ITransport";

export class Transport implements ITransport {
  public name?: string;
  public from: string;
  public to: string;
  public args: IArgs[];

  constructor({ from, to, args, name }: ITransport) {
    this.from = from;
    this.to = to;
    this.args = args || [];
    this.name = name;
  }
}
