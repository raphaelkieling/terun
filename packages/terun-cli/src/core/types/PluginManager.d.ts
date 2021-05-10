import { IGeneratorHook } from './interfaces/IGeneratorHook';
import IPlugin from './interfaces/IPlugin';
export default class PluginManager {
    plugins: IPlugin[];
    addPlugin(plugin: IPlugin): void;
    install(hooks: IGeneratorHook): void;
}
