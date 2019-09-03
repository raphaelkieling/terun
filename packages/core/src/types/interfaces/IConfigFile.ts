import { ICommand } from "./ICommand";

export default interface IConfigFile {
  baseUrl: string;
  commands: ICommand[];
}
