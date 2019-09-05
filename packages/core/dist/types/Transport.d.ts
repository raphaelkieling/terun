import { ITemplateArgs } from "./interfaces/ITemplateArgs";
import { ITransport } from "./interfaces/ITransport";
export declare class Transport implements ITransport {
    name?: string;
    from: string;
    to: string;
    args: ITemplateArgs[];
    constructor({ from, to, args, name }: ITransport);
    getSource(): object;
}
