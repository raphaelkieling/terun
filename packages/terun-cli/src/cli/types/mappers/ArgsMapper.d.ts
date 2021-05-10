import { IArgs } from '../../../core/types/interfaces';
export default class ArgsMapper {
    static fromString(value: string): IArgs;
    static fromList(values: (IArgs | string)[]): IArgs[];
}
