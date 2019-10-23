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
    return Transport;
}());
exports.Transport = Transport;
