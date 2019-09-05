import { ICommand } from "./ICommand";

export interface IConfig {
  // this change the tag from mustache renderer. Default is ['{{','}}']
  tag: string[];
  basePath: string;
  commands: { [key: string]: ICommand };
}
