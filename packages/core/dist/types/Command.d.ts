import { ICommand } from "./interfaces/ICommand";
import { ITemplateArgs } from "./interfaces/ITemplateArgs";
import { Transport } from "./Transport";
export declare class Command implements ICommand {
    name?: string;
    args: ITemplateArgs[];
    transports: Transport[];
    constructor({ name, args, transports }: ICommand);
    getSource(): object;
}
