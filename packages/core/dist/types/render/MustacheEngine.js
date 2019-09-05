"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mustache = require("terun-mustache");
var MustacheEngine = /** @class */ (function () {
    function MustacheEngine() {
        this.engine = Mustache;
    }
    MustacheEngine.prototype.render = function (template, args) {
        return this.engine.render(template, args);
    };
    return MustacheEngine;
}());
exports.MustacheEngine = MustacheEngine;
