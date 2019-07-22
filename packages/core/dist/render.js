"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var terun_mustache_1 = __importDefault(require("terun-mustache"));
var Render = (function () {
    function Render() {
        this.engine = terun_mustache_1["default"];
    }
    Render.prototype.render = function (template, args) {
        return this.engine.render(template, args);
    };
    return Render;
}());
exports["default"] = Render;
