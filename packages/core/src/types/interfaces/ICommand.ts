import { ITransport } from "./ITransport";
import { IArgs } from "./IArgs";

export interface ICommand {
  name?: string;
  args: IArgs[];
  transports: ITransport[];
}
