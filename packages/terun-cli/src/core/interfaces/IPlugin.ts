import { IGeneratorHook } from './IGeneratorHook';

export type RenderData = Record<string, unknown>;

export default interface IPlugin {
    name: string;
    install(hooks: IGeneratorHook): Promise<void> | void;
}
