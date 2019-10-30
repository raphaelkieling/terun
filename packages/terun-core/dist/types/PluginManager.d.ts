import IPlugin from './interfaces/IPlugin';
import { Hooks } from './interfaces/IPlugin';
export default class PluginManager {
    plugins: IPlugin[];
    addPlugin(plugin: IPlugin): void;
    install(hooks: Hooks): void;
}
