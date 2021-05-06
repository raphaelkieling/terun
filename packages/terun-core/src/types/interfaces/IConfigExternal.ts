import { ICommand } from "./ICommand";
import { EngineType } from "./IConfig";

export interface IConfigExternal {
  tag?: string[];
  basePath?: string;
  engine?: EngineType;
  commands: { [key: string]: ICommand };
}
