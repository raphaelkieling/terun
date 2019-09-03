import { ITransportArgs } from "./ITransportArgs";

export interface ITransport {
  from: string;
  to: string;
  args: string[] | ITransportArgs[];
}
