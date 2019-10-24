import { ICommand } from "./ICommand";
import { EngineConfigOption } from './IConfig';

export interface IConfigExternal {
  tag?: string[];
  basePath?: string;
  engine?: EngineConfigOption;
  commands: { [key: string]: ICommand };
}
