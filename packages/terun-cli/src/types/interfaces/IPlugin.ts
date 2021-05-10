import { ITransport } from './ITransport';
import { IConfig } from './IConfig';
import { IGeneratorHook } from './IGeneratorHook';

export type RenderData = Record<string, unknown>;
export type ConfigureParams = { config: IConfig };
export type OnTransportParams = { transport: ITransport };
export type BeforeRenderParams = { localArgs: RenderData };

export default interface IPlugin {
    name: string;
    install(hooks: IGeneratorHook): Promise<void> | void;
}
