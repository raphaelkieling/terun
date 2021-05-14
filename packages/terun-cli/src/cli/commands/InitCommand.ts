import { ICommand } from './ICommand';
import { ConfigReader } from '../types/ConfigReader';
import { CommanderStatic } from 'commander';
import { Log, MESSAGES, Prompts } from '../ui';

type InitCommandArgs = {
    override: boolean;
};

export class InitCommand implements ICommand {
    getInitialFileContent(): string {
        return `
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
        `.trim();
    }

    async createInitialFile(args: InitCommandArgs): Promise<void> {
        if (ConfigReader.exist() && !args.override) {
            const override = await Prompts.canOverride();

            if (!override) {
                Log.warn(MESSAGES.OPERATION_CANCELED);
                return;
            }
        }

        ConfigReader.create(this.getInitialFileContent());

        Log.info(MESSAGES.WELCOME_MESSAGE);
        Log.success(MESSAGES.CONFIG_FILE_CREATED);
    }

    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('init')
            .description('Init the terun configuration')
            .option('-o, --override', 'Override the file without confirm')
            .action(async (args: InitCommandArgs) => this.createInitialFile(args));
    }
}
