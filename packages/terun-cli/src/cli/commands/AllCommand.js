"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllCommand = void 0;
const ConfigReader_1 = require("../../core/ConfigReader");
const ui_1 = require("../ui");
const prompts_1 = require("../../utils/prompts");
class AllCommand {
    getAllCommands() {
        const config = ConfigReader_1.ConfigReader.find();
        if (!config) {
            ui_1.error('Config file terun.js not found');
            return prompts_1.exitProcess();
        }
        try {
            const commands = Object.keys(config.commands);
            for (const command of commands) {
                ui_1.info(`- ${command}`);
            }
            console.log('\n');
        }
        catch (e) {
            ui_1.error(e);
        }
    }
    async handle(program) {
        program.command('all').description('Get all commands availables').action(this.getAllCommands);
    }
}
exports.AllCommand = AllCommand;
