"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustacheEngine = void 0;
const Mustache = require('terun-mustache');
const Pipeline_1 = require("../Pipeline");
class MustacheEngine {
    constructor() {
        this.engine = Mustache;
    }
    async render(template, args, tags) {
        args = Object.assign(args, Pipeline_1.defaultPipelines);
        return this.engine.render(template, args, {}, tags);
    }
}
exports.MustacheEngine = MustacheEngine;
