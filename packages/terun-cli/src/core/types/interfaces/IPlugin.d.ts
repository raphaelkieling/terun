import { ITransport } from './ITransport';
import { IConfig } from './IConfig';
import { IGeneratorHook } from './IGeneratorHook';
export declare type RenderData = Record<string, unknown>;
export declare type ConfigureParams = {
    config: IConfig;
};
export declare type OnTransportParams = {
    transport: ITransport;
};
export declare type BeforeRenderParams = {
    localArgs: RenderData;
};
export default interface IPlugin {
    name: string;
    install(hooks: IGeneratorHook): Promise<void> | void;
}
