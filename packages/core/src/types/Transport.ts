import { ITransport } from "./interfaces/ITransport";
import { ITransportArgs } from "./interfaces/ITransportArgs";

export class Transport implements ITransport {
  public from: string;
  public to: string;
  public args: string[] | ITransportArgs[];

  constructor(from: string, to: string, args: string[] | ITransportArgs[]) {
    this.from = from;
    this.to = to;
    this.args = args;
  }
}
