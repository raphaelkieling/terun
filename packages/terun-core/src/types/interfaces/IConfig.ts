import { ICommand } from "./ICommand";

export enum EngineType {
  MUSTACHE = "mustache",
  LIQUID = "liquid",
}

export interface IConfig {
  tag: string[];
  basePath: string;
  engine: EngineType;
  commands: { [key: string]: ICommand };
}
