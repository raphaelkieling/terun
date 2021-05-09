import commander from 'commander';
import * as pack from '../package.json';
import { AllCommand } from './commands/AllCommand';
import { printLogo } from './utils/index';
import { InitCommand } from './commands/InitCommand';
import { MakeCommand } from './commands/MakeCommand';

!(async function () {
    const version = pack.version;

    await printLogo(version);

    commander.version(version);

    await new AllCommand().handle(commander);
    await new InitCommand().handle(commander);
    await new MakeCommand().handle(commander);

    commander.parse(process.argv);
})();
