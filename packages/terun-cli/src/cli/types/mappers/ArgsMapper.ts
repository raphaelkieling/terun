import { IArgs } from '../../../core/types/interfaces';

export default class ArgsMapper {
    static fromString(value: string): IArgs {
        return {
            type: 'text',
            initial: '',
            message: value,
            name: value,
        };
    }

    static fromList(values: (IArgs | string)[]): IArgs[] {
        return values.map((val) => {
            if (typeof val === 'string') {
                return ArgsMapper.fromString(val);
            } else {
                return val;
            }
        });
    }
}
