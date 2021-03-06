import commander from 'commander';
import * as pack from '../../package.json';
import { AllCommand } from './commands/AllCommand';
import { InitCommand } from './commands/InitCommand';
import { TransportCommand } from './commands/TransportCommand';
import { Banner, Log } from './ui';

!(async () => {
    const version = pack.version;

    Log.success(Banner.getBanner(version));

    commander.version(version);

    await new AllCommand().handle(commander);
    await new InitCommand().handle(commander);
    await new TransportCommand().handle(commander);

    commander.parse(process.argv);
})();
