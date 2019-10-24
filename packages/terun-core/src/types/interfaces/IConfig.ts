import { ICommand } from "./ICommand";

export type EngineConfigOption = "mustache" | "liquid";

export interface IConfig {
  tag: string[];
  basePath: string;
  engine: EngineConfigOption;
  commands: { [key: string]: ICommand };
}
