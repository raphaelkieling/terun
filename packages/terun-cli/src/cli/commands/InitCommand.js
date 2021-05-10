"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCommand = void 0;
const ConfigReader_1 = require("../../core/ConfigReader");
const prompts_1 = require("../../utils/prompts");
const ui_1 = require("../ui");
class InitCommand {
    async handle(program) {
        program
            .command('init')
            .description('Init the terun configuration')
            .option('-o, --override', 'Override the file without confirm')
            .action(async (args) => {
            if (ConfigReader_1.ConfigReader.exist() && args.override !== true) {
                const override = await prompts_1.canOverride();
                if (!override) {
                    ui_1.warn('Operation canceled.');
                    return;
                }
            }
            ConfigReader_1.ConfigReader.create(`
module.exports = {
    commands: {
        // Create your commands here and exec with > terun --make example
        example: {
            // Put your plugins here! See in https://terun.netlify.app/latest/reference/plugins.html#using-your-first-plugin
            plugins:[],
            args: [],
            hook: (hooks)=>{},
            transports: []
        }
    }
};
                `.trim());
            ui_1.info(ui_1.MESSAGES.WELCOME_MESSAGE);
            ui_1.success(ui_1.MESSAGES.CONFIG_FILE_CREATED);
        });
    }
}
exports.InitCommand = InitCommand;
