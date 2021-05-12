import Generator from '../Generator';
import { GeneratorHook } from '../GeneratorHooks';
import { IConfig } from '../interfaces';
import RenderEngineFactory from './RenderEngineFactory';
import { GeneratorStorage } from '../GeneratorStorage';

export class GeneratorFactory {
    static make(config: IConfig): Generator {
        return new Generator({
            hooks: new GeneratorHook(),
            config,
            render: RenderEngineFactory.make(config.engine),
            storage: new GeneratorStorage(),
        });
    }
}
