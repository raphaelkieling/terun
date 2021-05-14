import { InitCommand } from '../../../cli/commands/InitCommand';
import { ConfigReader } from '../../../cli/types/ConfigReader';
import { Log, Prompts } from '../../../cli/ui';

describe('InitCommand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    test('should create a initial file', async () => {
        const command = new InitCommand();

        jest.spyOn(ConfigReader, 'exist').mockReturnValue(false);

        const logInfoSpy = jest.spyOn(Log, 'info').mockImplementation();
        const logSuccessSpy = jest.spyOn(Log, 'success').mockImplementation();
        const configCreateSpy = jest.spyOn(ConfigReader, 'create').mockImplementation();

        const fileContent = 'xxx';
        jest.spyOn(command, 'getInitialFileContent').mockReturnValue(fileContent);

        await command.createInitialFile({
            override: false,
        });

        expect(logInfoSpy).toBeCalled();
        expect(logSuccessSpy).toBeCalled();
        expect(configCreateSpy).toBeCalledWith(fileContent);
    });

    test('should not create a initial file when a file already exist', async () => {
        const command = new InitCommand();

        jest.spyOn(ConfigReader, 'exist').mockReturnValue(true);
        jest.spyOn(Prompts, 'canOverride').mockResolvedValue(false);

        const configCreateSpy = jest.spyOn(ConfigReader, 'create').mockImplementation();
        const logWarnSpy = jest.spyOn(Log, 'warn').mockImplementation();

        await command.createInitialFile({
            override: false,
        });

        expect(logWarnSpy).toBeCalled();
        expect(configCreateSpy).not.toBeCalled();
    });

    test('should create a initial file when a file already exist but the override was selected', async () => {
        const command = new InitCommand();

        jest.spyOn(ConfigReader, 'exist').mockReturnValue(true);
        jest.spyOn(Prompts, 'canOverride').mockResolvedValue(true);

        const logInfoSpy = jest.spyOn(Log, 'info').mockImplementation();
        const logSuccessSpy = jest.spyOn(Log, 'success').mockImplementation();
        const configCreateSpy = jest.spyOn(ConfigReader, 'create').mockImplementation();

        await command.createInitialFile({
            override: false,
        });

        expect(configCreateSpy).toBeCalled();
        expect(logInfoSpy).toBeCalled();
        expect(logSuccessSpy).toBeCalled();
    });
});
