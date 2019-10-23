import { IArgs } from "./interfaces/IArgs";
import { ITransport } from "./interfaces/ITransport";
export declare class Transport implements ITransport {
    name?: string;
    from: string;
    to: string;
    args: IArgs[];
    constructor({ from, to, args, name }: ITransport);
}
