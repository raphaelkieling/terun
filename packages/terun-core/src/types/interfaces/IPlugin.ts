import { ITransport } from "./ITransport";
import { IConfig } from "./IConfig";

export type RenderData = { [key: string]: any };
export type ConfigureParams = { config: IConfig };
export type OnTransportParams = { transport: ITransport };
export type BeforeRenderParams = { localArgs: RenderData };

export default interface IPlugin {
    name: string;

    configure?(params: ConfigureParams): void;
    onInit?(): Promise<void>;
    onTransport?(params: OnTransportParams): Promise<void>;
    beforeRender?(params: BeforeRenderParams): Promise<RenderData>;
    done?(): Promise<boolean>;
}