"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Transport = /** @class */ (function () {
    function Transport(_a) {
        var from = _a.from, to = _a.to, args = _a.args, name = _a.name, validator = _a.validator, debug = _a.debug;
        this.from = from;
        this.debug = debug ? true : false;
        this.to = to;
        this.args = args || [];
        this.name = name;
        this.validator = util_1.isNullOrUndefined(validator) ? null : validator;
    }
    return Transport;
}());
exports.Transport = Transport;
