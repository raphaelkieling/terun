import { IArgs } from "@terun/core/dist/types/interfaces/IArgs";
export default class ArgsMapper {
    static fromString(value: string): IArgs;
    static fromList(values: (IArgs | string)[]): IArgs[];
}
