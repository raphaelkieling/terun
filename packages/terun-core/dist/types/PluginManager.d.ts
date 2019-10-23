import IPlugin from './interfaces/IPlugin';
import { RenderData } from './interfaces/IPlugin';
import { ITransport } from './interfaces/ITransport';
import { IConfig } from './interfaces/IConfig';
export default class PluginManager {
    plugins: IPlugin[];
    addPlugin(plugin: IPlugin): void;
    configure(config: IConfig): Promise<void>;
    onInit(): Promise<void>;
    onTransport(transport: ITransport): Promise<void>;
    beforeRender(localArgs: RenderData): Promise<RenderData>;
    done(): Promise<boolean>;
}
