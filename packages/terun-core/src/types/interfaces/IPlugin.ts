import { ITransport } from "./ITransport";
import { IConfig } from "./IConfig";
import { Hook } from "tapable";

export type RenderData = { [key: string]: any };
export type ConfigureParams = { config: IConfig };
export type OnTransportParams = { transport: ITransport };
export type BeforeRenderParams = { localArgs: RenderData };
export type Hooks = { [key: string]: Hook };

export default interface IPlugin {
    name: string;
    install(hooks: Hooks): Promise<any> | void;
}