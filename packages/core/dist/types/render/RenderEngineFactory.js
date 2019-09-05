"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MustacheEngine_1 = require("./MustacheEngine");
var RenderEngineFactory = /** @class */ (function () {
    function RenderEngineFactory() {
    }
    RenderEngineFactory.createMustache = function () {
        return new MustacheEngine_1.MustacheEngine();
    };
    return RenderEngineFactory;
}());
exports.default = RenderEngineFactory;
