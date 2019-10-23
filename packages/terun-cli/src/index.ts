import * as Yargs from "yargs";
import CommandManager from './CommandManager';
import { MakeCommand } from "./domain/MakeCommand";
import { InitCommand } from "./domain/InitCommand";
import { AllCommand } from "./domain/AllCommand";
import { printLogo } from './utils/index';

!async function () {
    await printLogo();

    const argv = Yargs.argv;

    const manager = new CommandManager()
    manager.addCommand(new MakeCommand());
    manager.addCommand(new AllCommand());
    manager.addCommand(new InitCommand());
    manager.execute(argv);
}()


