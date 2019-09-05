import { ITransport } from "./ITransport";
import { ITemplateArgs } from "./ITemplateArgs";
export interface ICommand {
    name?: string;
    args: ITemplateArgs[];
    transports: ITransport[];
}
