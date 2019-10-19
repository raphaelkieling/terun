import * as Yargs from "yargs";
import CommandManager from './CommandManager';
import { MakeCommand } from "./domain/MakeCommand";
import { InitCommand } from "./domain/InitCommand";

const argv = Yargs.argv;

const manager = new CommandManager()
manager.addCommand(new MakeCommand());
manager.addCommand(new InitCommand());
manager.execute(argv);