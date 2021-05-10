import commander from 'commander';
import * as pack from '../../package.json';
import { AllCommand } from './commands/AllCommand';
import { InitCommand } from './commands/InitCommand';
import { TransportCommand } from './commands/TransportCommand';
import { getBanner, success } from './ui';

!(async () => {
    const version = pack.version;

    success(getBanner(version));

    commander.version(version);

    new AllCommand().handle(commander);
    new InitCommand().handle(commander);
    new TransportCommand().handle(commander);

    commander.parse(process.argv);
})();
