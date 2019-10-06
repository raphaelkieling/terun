import Yargs from "yargs";
import CommandManager from './CommandManager';
import { MakeCommand } from "./domain/MakeCommand";

const argv = Yargs;

const manager = new CommandManager()
manager.addCommand(new MakeCommand());
manager.execute(argv);