"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transport = /** @class */ (function () {
    function Transport(_a) {
        var from = _a.from, to = _a.to, args = _a.args, name = _a.name;
        this.from = from;
        this.to = to;
        this.args = args || [];
        this.name = name;
    }
    Transport.prototype.getSource = function () {
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
    return Transport;
}());
exports.Transport = Transport;
