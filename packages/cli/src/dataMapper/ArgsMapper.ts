import { IArgs } from "@terun/core/dist/types/interfaces/IArgs";

export default class ArgsMapper {
    static fromString(value: string): IArgs {
        return {
            default: '',
            label: value,
            variable: value
        }
    }

    static fromList(values: (IArgs | string)[]): IArgs[] {
        return values.map(val => {
            if (typeof val === 'string') {
                return ArgsMapper.fromString(val);
            } else {
                return val;
            }
        })
    }
}