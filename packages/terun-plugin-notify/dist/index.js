"use strict";
var node_notifier_1 = require("node-notifier");
var NotifyPlugin = /** @class */ (function () {
    function NotifyPlugin(params) {
        this.name = 'Notify';
        this.options = Object.assign({
            title: 'Terun done',
            message: 'It\'s done with success'
        }, params);
    }
    NotifyPlugin.prototype.install = function (hooks) {
        var _this = this;
        hooks.done.tap("NotifyPlugin", function () {
            node_notifier_1.notify({
                title: _this.options.title,
                message: _this.options.message
            });
        });
    };
    return NotifyPlugin;
}());
module.exports = NotifyPlugin;
