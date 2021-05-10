"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const IConfig_1 = require("./interfaces/IConfig");
class Config {
    constructor() {
        this.basePath = '.';
        this.commands = {};
        this.engine = IConfig_1.EngineType.MUSTACHE;
        this.tag = ['{{', '}}'];
    }
}
exports.Config = Config;
