"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
        this.engine = "mustache";
        this.basePath = ".";
        this.commands = {};
        this.tag = this.getDefaultTags();
    }
    Config.prototype.getDefaultTags = function () {
        return ["{{", "}}"];
    };
    return Config;
}());
exports.Config = Config;
