"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Yargs = require("yargs");
var CommandManager_1 = require("./CommandManager");
var MakeCommand_1 = require("./domain/MakeCommand");
var argv = Yargs.argv;
var manager = new CommandManager_1.default();
manager.addCommand(new MakeCommand_1.MakeCommand());
manager.execute(argv);
