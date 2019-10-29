import { ITransport } from "./ITransport";
import { IConfig } from "./IConfig";
export declare type RenderData = {
    [key: string]: any;
};
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
    configure?(params: ConfigureParams): void;
    onInit?(): Promise<void>;
    onTransport?(params: OnTransportParams): Promise<void>;
    beforeRender?(params: BeforeRenderParams): Promise<RenderData>;
    done?(): Promise<boolean>;
}
