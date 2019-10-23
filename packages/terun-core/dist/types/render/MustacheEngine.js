"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mustache = require("terun-mustache");
var Pipeline_1 = require("../Pipeline");
var MustacheEngine = /** @class */ (function () {
    function MustacheEngine() {
        this.engine = Mustache;
    }
    MustacheEngine.prototype.render = function (template, args) {
        args = Object.assign(args, Pipeline_1.defaultPipelines);
        return this.engine.render(template, args);
    };
    return MustacheEngine;
}());
exports.MustacheEngine = MustacheEngine;
