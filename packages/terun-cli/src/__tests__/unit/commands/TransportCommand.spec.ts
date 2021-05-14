import { TransportCommand } from '../../../cli/commands/TransportCommand';
import { ConfigReader } from '../../../cli/types/ConfigReader';
import { IConfigExternal } from '../../../cli/types/interfaces/IConfigExternal';
import { Log, Prompts } from '../../../cli/ui';
import Transporter from '../../../core/Generator';

describe('TransportCommand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should give a error when not found a config', async () => {
        const command = new TransportCommand();

        jest.spyOn(ConfigReader, 'find').mockReturnValue(null);
        const logErrorSpy = jest.spyOn(Log, 'error').mockImplementation();
        const exitProcessSpy = jest.spyOn(Prompts, 'exitProcess').mockImplementation();

        await command.initTransport('test', {
            debug: false,
            override: false,
        });

        expect(exitProcessSpy).toBeCalled();
        expect(logErrorSpy).toBeCalled();
    });

    test('should run the command with success', async () => {
        const command = new TransportCommand();
        const config: IConfigExternal = {
            commands: {
                test: {
                    transports: [
                        {
                            from: 'x',
                            to: 'y',
                        },
                    ],
                },
            },
        };

        jest.spyOn(Log, 'error').mockImplementation();
        jest.spyOn(Log, 'success').mockImplementation();
        jest.spyOn(Log, 'warn').mockImplementation();

        jest.spyOn(ConfigReader, 'find').mockReturnValue(config);

        await command.initTransport('test', {
            debug: false,
            override: false,
        });

        // TODO: Finalize the transport tests
    });
});
