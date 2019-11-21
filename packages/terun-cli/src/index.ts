import * as Yargs from "yargs";
import CommandManager from "./CommandManager";
import { MakeCommand } from "./commands/MakeCommand";
import { InitCommand } from "./commands/InitCommand";
import { AllCommand } from "./commands/AllCommand";
import { printLogo } from "./utils/index";

/**
 * TODO: Add options like a helper like:
 *
 * --make ...
 * --init ...
 *
 * now only exists on document
 */
!(async function() {
  await printLogo();

  const argv = Yargs.argv;

  const manager = new CommandManager();
  manager.addCommand(new MakeCommand());
  manager.addCommand(new AllCommand());
  manager.addCommand(new InitCommand());
  manager.execute(argv);
})();
