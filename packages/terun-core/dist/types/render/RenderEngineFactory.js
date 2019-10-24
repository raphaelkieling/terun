"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MustacheEngine_1 = require("./MustacheEngine");
var LiquidEngine_1 = require("./LiquidEngine");
var RenderEngineFactory = /** @class */ (function () {
    function RenderEngineFactory() {
    }
    RenderEngineFactory.createMustache = function () {
        return new MustacheEngine_1.MustacheEngine();
    };
    RenderEngineFactory.createLiquid = function () {
        return new LiquidEngine_1.LiquidEngine();
    };
    RenderEngineFactory.make = function (type) {
        if (type === "mustache") {
            return RenderEngineFactory.createMustache();
        }
        else if (type === "liquid") {
            return RenderEngineFactory.createLiquid();
        }
        else {
            return RenderEngineFactory.createMustache();
        }
    };
    return RenderEngineFactory;
}());
exports.default = RenderEngineFactory;
