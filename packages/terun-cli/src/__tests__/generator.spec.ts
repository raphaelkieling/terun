import Generator from '../Generator';
import { IConfig } from '../types/interfaces';
import { ConfigMapper } from '../mappers/ConfigMapper';
import { File } from '../utils';

describe('Generator', () => {
    it('should create the file using the template specified', async () => {
        const mockTransport = {
            from: 'x',
            to: 'y',
        };

        const mockFileContent = `
        Hello {{name}}
    `;

        const expectedTemplateResult = `
        Hello username
    `;

        jest.spyOn(File, 'getUtf8File').mockReturnValue(mockFileContent);

        const createDirSpy = jest.spyOn(File, 'createDir').mockImplementation(() => null);

        const writeUtf8FileSpy = jest.spyOn(File, 'writeUtf8File').mockImplementation(() => null);

        const config: IConfig = ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });

        const generator: Generator = new Generator(config);
        await generator.transport({
            source: {
                name: 'username',
            },
            transport: mockTransport,
        });

        expect(createDirSpy).toBeCalled();
        expect(createDirSpy).toBeCalledWith(mockTransport.to);
        expect(writeUtf8FileSpy).toBeCalled();
        expect(writeUtf8FileSpy).toBeCalledWith(mockTransport.to, expectedTemplateResult);
    });

    it('should exec all lifecycle hooks with the correct args', async () => {
        const mockTransport = {
            from: 'x',
            to: 'y',
        };

        // Mock file utils
        jest.spyOn(File, 'getUtf8File').mockReturnValue('');
        jest.spyOn(File, 'createDir').mockImplementation(() => null);
        jest.spyOn(File, 'writeUtf8File').mockImplementation(() => null);

        const config: IConfig = ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });

        const generator: Generator = new Generator(config);

        const hookGlobal = jest.spyOn(generator.hooks.global, 'promise');
        const hookFileExist = jest.spyOn(generator.hooks.fileExists, 'promise');
        const hookFileSkipped = jest.spyOn(generator.hooks.fileSkipped, 'call');
        const hookConfigure = jest.spyOn(generator.hooks.configure, 'call');
        const hookOnTransport = jest.spyOn(generator.hooks.onTransport, 'call');
        const hookBeforeRender = jest.spyOn(generator.hooks.beforeRender, 'promise');
        const hookDone = jest.spyOn(generator.hooks.done, 'call');

        await generator.transport({
            source: {},
            transport: mockTransport,
        });

        expect(hookGlobal).not.toBeCalled();
        expect(hookFileExist).not.toBeCalled();
        expect(hookFileSkipped).not.toBeCalled();

        expect(hookConfigure).toBeCalled();
        expect(hookOnTransport).toBeCalled();
        expect(hookBeforeRender).toBeCalled();
        expect(hookDone).toBeCalled();
    });

    it('should send the skipped and exist hook when the file already exists and override is true', async () => {
        const mockTransport = {
            from: 'x',
            to: 'y',
        };

        // Mock file utils
        jest.spyOn(File, 'getUtf8File').mockReturnValue('');
        jest.spyOn(File, 'createDir').mockImplementation(() => null);
        jest.spyOn(File, 'writeUtf8File').mockImplementation(() => null);
        jest.spyOn(File, 'existFile').mockReturnValue(true);

        const config: IConfig = ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });

        const generator: Generator = new Generator(config);

        const hookFileExist = jest.spyOn(generator.hooks.fileExists, 'promise');
        const hookFileSkipped = jest.spyOn(generator.hooks.fileSkipped, 'call');

        await generator.transport({
            source: {},
            transport: mockTransport,
            override: true,
        });

        expect(hookFileExist).toBeCalled();
        expect(hookFileSkipped).toBeCalled();
    });
});
