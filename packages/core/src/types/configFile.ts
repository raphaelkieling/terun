export default interface IConfigFile {
  baseUrl: string;
  commands: ICommand;
}

export interface ICommand {
  name: string;
  args: string | string[];
  carrys: ICarryFile;
}

export interface ICarryFile {
  from: string;
  to: string;
  args: string | string;
}
