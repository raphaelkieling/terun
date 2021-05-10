import { IArgs } from './interfaces/IArgs';
import { ITransport, ITransportValidationParams } from './interfaces/ITransport';
export declare class Transport implements ITransport {
    name?: string;
    debug?: boolean;
    from: string;
    to: string;
    args: IArgs[];
    validator?: ((params: ITransportValidationParams) => boolean | Promise<boolean>) | null | boolean;
    constructor({ from, to, args, name, validator, debug }: ITransport);
}
