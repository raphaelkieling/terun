"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluginManager = /** @class */ (function () {
    function PluginManager() {
        this.plugins = [];
    }
    PluginManager.prototype.addPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    PluginManager.prototype.install = function (hooks) {
        this.plugins.forEach(function (plugin) { return plugin.install(hooks); });
    };
    return PluginManager;
}());
exports.default = PluginManager;
