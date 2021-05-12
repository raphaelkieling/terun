import { ICommand } from './ICommand';
import { ConfigReader } from '../../core/ConfigReader';
import { canOverride } from '../../utils/prompts';
import { CommanderStatic } from 'commander';
import { warn, info, success, MESSAGES } from '../ui';

type InitCommandArgs = {
    override: boolean;
};

export class InitCommand implements ICommand {
    async handle(program: CommanderStatic): Promise<void> {
        program
            .command('init')
            .description('Init the terun configuration')
            .option('-o, --override', 'Override the file without confirm')
            .action(async (args: InitCommandArgs) => {
                if (ConfigReader.exist() && !args.override) {
                    const override = await canOverride();

                    if (!override) {
                        warn(MESSAGES.OPERATION_CANCELED);
                        return;
                    }
                }

                ConfigReader.create(
                    `
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
                `.trim(),
                );

                info(MESSAGES.WELCOME_MESSAGE);
                success(MESSAGES.CONFIG_FILE_CREATED);
            });
    }
}
