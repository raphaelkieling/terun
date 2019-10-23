import { ITransport } from "./ITransport";
import { IArgs } from "./IArgs";
import IPlugin from './IPlugin';

export interface ICommand {
  name?: string;
  plugins?: IPlugin[];
  args?: IArgs[];
  transports: ITransport[];
}
