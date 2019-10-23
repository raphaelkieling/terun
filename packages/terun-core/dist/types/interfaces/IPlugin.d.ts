import { ITransport } from "./ITransport";
import { IConfig } from "./IConfig";
export declare type RenderData = {
    [key: string]: any;
};
export default interface IPlugin {
    name: string;
    config: IConfig;
    onInit(): Promise<void>;
    onTransport(transport: ITransport): Promise<void>;
    beforeRender(localArgs: RenderData): Promise<RenderData>;
    doneRender(): Promise<boolean>;
}
