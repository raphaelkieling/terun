import { IArgs } from "./interfaces/IArgs";
import { ITransport, ITransportValidationParams } from './interfaces/ITransport';
import { isNullOrUndefined } from "util";

export class Transport implements ITransport {
  public name?: string;
  public from: string;
  public to: string;
  public args: IArgs[];
  public validator?: ((params: ITransportValidationParams) => (boolean | Promise<boolean>)) | null | boolean;

  constructor({ from, to, args, name, validator }: ITransport) {
    this.from = from;
    this.to = to;
    this.args = args || [];
    this.name = name;
    this.validator = isNullOrUndefined(validator) ? null : validator;
  }
}
