"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IConfig_1 = require("../interfaces/IConfig");
const MustacheEngine_1 = require("../engines/MustacheEngine");
const LiquidEngine_1 = require("../engines/LiquidEngine");
class RenderEngineFactory {
    static createMustache() {
        return new MustacheEngine_1.MustacheEngine();
    }
    static createLiquid() {
        return new LiquidEngine_1.LiquidEngine();
    }
    static make(type) {
        if (type === IConfig_1.EngineType.MUSTACHE) {
            return RenderEngineFactory.createMustache();
        }
        if (type === IConfig_1.EngineType.LIQUID) {
            return RenderEngineFactory.createLiquid();
        }
        return RenderEngineFactory.createMustache();
    }
}
exports.default = RenderEngineFactory;
