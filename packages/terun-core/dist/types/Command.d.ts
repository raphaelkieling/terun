import { ICommand } from "./interfaces/ICommand";
import { Transport } from "./Transport";
import { IArgs } from "./interfaces/IArgs";
export declare class Command implements ICommand {
    name?: string;
    args: IArgs[];
    transports: Transport[];
    constructor({ name, args, transports }: ICommand);
}
