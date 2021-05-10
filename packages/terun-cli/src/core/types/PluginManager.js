"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PluginManager {
    constructor() {
        this.plugins = [];
    }
    addPlugin(plugin) {
        this.plugins.push(plugin);
    }
    install(hooks) {
        this.plugins.forEach((plugin) => plugin.install(hooks));
    }
}
exports.default = PluginManager;
