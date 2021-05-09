import IPlugin from './interfaces/IPlugin';
import { Hooks } from './interfaces/IPlugin';

export default class PluginManager {
    plugins: IPlugin[] = [];

    addPlugin(plugin: IPlugin) {
        this.plugins.push(plugin);
    }

    install(hooks: Hooks) {
        this.plugins.forEach((plugin) => plugin.install(hooks));
    }
}
