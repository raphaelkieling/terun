import { ITemplateArgs } from "./ITemplateArgs";
export interface ITransport {
    name?: string;
    from: string;
    to: string;
    args?: ITemplateArgs[];
}
