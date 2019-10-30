import { ITransport } from "./ITransport";
import { IConfig } from "./IConfig";
import { Hook } from "tapable";
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
export declare type Hooks = {
    [key: string]: Hook;
};
export default interface IPlugin {
    name: string;
    install(hooks: Hooks): Promise<any> | void;
}
