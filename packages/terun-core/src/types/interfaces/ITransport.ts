import { IArgs } from "./IArgs";
import { RenderData } from "./IPlugin";

export type ITransportValidationParams = { args: RenderData };

export interface ITransport {
  name?: string;
  debug?: boolean;
  from: string;
  to: string;
  args?: IArgs[];
  validator?:
    | ((params: ITransportValidationParams) => boolean | Promise<boolean>)
    | null
    | boolean;
}
