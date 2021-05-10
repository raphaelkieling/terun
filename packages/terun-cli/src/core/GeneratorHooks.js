"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorHook = void 0;
const tapable_1 = require("tapable");
class GeneratorHook {
    constructor() {
        this.global = new tapable_1.AsyncSeriesWaterfallHook(['source']);
        this.fileExists = new tapable_1.AsyncSeriesBailHook();
        this.fileSkipped = new tapable_1.SyncHook();
        this.configure = new tapable_1.SyncHook(['globalConfig']);
        this.onTransport = new tapable_1.SyncHook(['transport', 'source']);
        this.beforeRender = new tapable_1.AsyncSeriesWaterfallHook(['source', 'transport', 'compiler']);
        this.done = new tapable_1.SyncHook();
    }
}
exports.GeneratorHook = GeneratorHook;
