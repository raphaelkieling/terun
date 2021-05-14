import { IArgs } from './interfaces';
import { ITransportItem, ITransportValidationParams } from './interfaces';

export class TransportItem implements ITransportItem {
    public name?: string;
    public debug?: boolean;
    public from: string;
    public to: string;
    public args: IArgs[];
    public validator?: ((params: ITransportValidationParams) => boolean | Promise<boolean>) | null | boolean;

    constructor({ from, to, args, name, validator, debug }: ITransportItem) {
        this.from = from;
        this.debug = debug;
        this.to = to;
        this.args = args || [];
        this.name = name;
        this.validator = validator ?? null;
    }
}
