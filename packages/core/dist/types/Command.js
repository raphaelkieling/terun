"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./Transport");
var Command = /** @class */ (function () {
    function Command(_a) {
        var name = _a.name, args = _a.args, transports = _a.transports;
        this.name = name;
        this.args = args;
        this.transports = transports.map(function (item) { return new Transport_1.Transport(item); });
    }
    Command.prototype.getSource = function () {
        var _a;
        var params = {};
        for (var _i = 0, _b = this.args; _i < _b.length; _i++) {
            var arg = _b[_i];
            params = Object.assign(params, (_a = {},
                _a[arg.variable] = arg.value,
                _a));
        }
        return params;
    };
    return Command;
}());
exports.Command = Command;
