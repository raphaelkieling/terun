import { Transport } from "../Transport";

export interface ICommand {
  name: string;
  args: string | string[];
  transports: Transport[];
}
