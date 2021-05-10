import { Config } from '../../../core/types/Config';
import { IConfigExternal } from '../interfaces/IConfigExternal';
export declare class ConfigMapper {
    static toInternalConfig(options: IConfigExternal): Config;
}
