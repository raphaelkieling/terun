import { Config } from "../Config";
import { IConfigExternal } from "../interfaces/IConfigExternal";
export declare class ConfigMapper {
    static fromConfigExternal(options: IConfigExternal): Config;
}
