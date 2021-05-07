import { CommanderStatic } from "commander";

export interface Command {
  handle(program: CommanderStatic): void;
}
