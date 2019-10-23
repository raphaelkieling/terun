import { IArgs } from "./IArgs";

export interface ITransport {
  name?: string;
  from: string;
  to: string;
  args?: IArgs[];
}
