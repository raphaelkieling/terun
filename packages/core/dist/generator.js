"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Config_1 = require("./types/Config");
var RenderEngineFactory_1 = require("./types/render/RenderEngineFactory");
var file_1 = require("./utils/file");
var Generator = /** @class */ (function () {
    function Generator(options) {
        this.render = RenderEngineFactory_1.default.createMustache();
        this.options = Object.assign(options, new Config_1.Config());
    }
    Generator.prototype.transport = function (_a) {
        var transport = _a.transport, source = _a.source;
        var basePath = this.options.basePath;
        var pathFrom = path.join(basePath, this.render.render(transport.from, source));
        var pathTo = path.join(basePath, this.render.render(transport.to, source));
        var fromContentFile = file_1.getUtf8File(pathFrom);
        var fromContentRendered = this.render.render(fromContentFile, source);
        file_1.writeUtf8File(pathTo, fromContentRendered);
    };
    return Generator;
}());
exports.default = Generator;
