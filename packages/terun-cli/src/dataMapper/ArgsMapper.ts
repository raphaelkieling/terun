import { IArgs } from "@terun/core/lib/types/interfaces/IArgs";

export default class ArgsMapper {
  static fromString(value: string): IArgs {
    return {
      type: "text",
      initial: "",
      message: value,
      name: value
    };
  }

    // TODO: colocar type text como default
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
