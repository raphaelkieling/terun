"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidEngine = void 0;
const Pipeline_1 = require("../Pipeline");
const liquidjs_1 = require("liquidjs");
class LiquidEngine {
    constructor() {
        this.engine = new liquidjs_1.Liquid();
    }
    async render(template, args) {
        args = Object.assign(args, Pipeline_1.defaultPipelines);
        return await this.engine.parseAndRender(template, args);
    }
}
exports.LiquidEngine = LiquidEngine;
