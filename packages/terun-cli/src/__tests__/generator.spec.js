"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = __importDefault(require("../Generator"));
const ConfigMapper_1 = require("../mappers/ConfigMapper");
const utils_1 = require("../utils");
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
        jest.spyOn(utils_1.File, 'getUtf8File').mockReturnValue(mockFileContent);
        const createDirSpy = jest.spyOn(utils_1.File, 'createDir').mockImplementation(() => null);
        const writeUtf8FileSpy = jest.spyOn(utils_1.File, 'writeUtf8File').mockImplementation(() => null);
        const config = ConfigMapper_1.ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });
        const generator = new Generator_1.default(config);
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
        jest.spyOn(utils_1.File, 'getUtf8File').mockReturnValue('');
        jest.spyOn(utils_1.File, 'createDir').mockImplementation(() => null);
        jest.spyOn(utils_1.File, 'writeUtf8File').mockImplementation(() => null);
        const config = ConfigMapper_1.ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });
        const generator = new Generator_1.default(config);
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
        jest.spyOn(utils_1.File, 'getUtf8File').mockReturnValue('');
        jest.spyOn(utils_1.File, 'createDir').mockImplementation(() => null);
        jest.spyOn(utils_1.File, 'writeUtf8File').mockImplementation(() => null);
        jest.spyOn(utils_1.File, 'existFile').mockReturnValue(true);
        const config = ConfigMapper_1.ConfigMapper.fromConfigExternal({
            commands: {
                test: {
                    transports: [mockTransport],
                },
            },
        });
        const generator = new Generator_1.default(config);
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
