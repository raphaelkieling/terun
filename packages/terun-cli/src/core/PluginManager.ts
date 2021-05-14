import { IGeneratorHook } from './interfaces/IGeneratorHook';
import IPlugin from './interfaces/IPlugin';

export default class PluginManager {
    plugins: IPlugin[] = [];

    addPlugin(plugin: IPlugin): void {
        this.plugins.push(plugin);
    }

    install(hooks: IGeneratorHook): void {
        this.plugins.forEach((plugin) => plugin.install(hooks));
    }
}
