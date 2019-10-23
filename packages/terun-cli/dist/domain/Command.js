"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(name) {
        this.params = new Map();
        this.paramsToGet = [];
        this.name = name;
    }
    Command.prototype.readParam = function (param) {
        this.paramsToGet.push(param);
        return this;
    };
    Command.prototype.setArgs = function (data) {
        for (var _i = 0, _a = this.paramsToGet; _i < _a.length; _i++) {
            var param = _a[_i];
            this.params.set(param, data[param]);
        }
    };
    return Command;
}());
exports.Command = Command;
