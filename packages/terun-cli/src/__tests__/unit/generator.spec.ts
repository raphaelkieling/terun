import RenderEngineFactory from '../../core/factories/RenderEngineFactory';
import Generator from '../../core/Generator';
import { GeneratorHook } from '../../core/GeneratorHooks';
import { IStorage } from '../../core/interfaces/IStorage';
import { Config } from '../../core/Config';

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

        const storage = {
            exist: jest.fn().mockRejectedValue(true),
            read: jest.fn().mockResolvedValue(mockFileContent),
            write: jest.fn(),
        } as IStorage;

        const config = new Config({});

        const generator: Generator = new Generator({
            hooks: new GeneratorHook(),
            render: RenderEngineFactory.make(),
            storage,
            config,
        });

        await generator.transport({
            source: {
                name: 'username',
            },
            transport: mockTransport,
        });

        expect(storage.exist).toBeCalled();
        expect(storage.exist).toBeCalledWith(mockTransport.to);
        expect(storage.read).toBeCalledWith(mockTransport.from);
        expect(storage.write).toBeCalled();
        expect(storage.write).toBeCalledWith(mockTransport.to, expectedTemplateResult);
    });
});
