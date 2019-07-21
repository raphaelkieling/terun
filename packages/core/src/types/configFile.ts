export default interface IConfigFile {
  baseUrl: string;
  commands: ICommand;
}

export interface ICommand {
  name: string;
  args: string | string[];
  transports: ITransportFile[];
}

export interface ITransportFile {
  from: string;
  to: string;
  args: string | string;
}
