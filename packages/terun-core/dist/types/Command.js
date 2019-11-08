"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./Transport");
var Command = /** @class */ (function () {
    function Command(_a) {
        var args = _a.args, transports = _a.transports, plugins = _a.plugins, hook = _a.hook;
        this.args = args || [];
        this.hook = hook;
        this.plugins = plugins || [];
        this.transports = transports.map(function (item) { return new Transport_1.Transport(item); });
    }
    return Command;
}());
exports.Command = Command;
