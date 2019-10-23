"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ConfigMapper_1 = require("./types/mappers/ConfigMapper");
var RenderEngineFactory_1 = require("./types/render/RenderEngineFactory");
var file_1 = require("./utils/file");
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
var Generator = /** @class */ (function () {
    function Generator(options) {
        this.render = RenderEngineFactory_1.default.createMustache();
        this.options = ConfigMapper_1.ConfigMapper.fromConfigExternal(options);
    }
    Generator.prototype.getCommand = function (name) {
        return this.options.commands[name];
    };
    Generator.prototype.resolvePaths = function (_a) {
        var transport = _a.transport, globalSource = _a.globalSource, transportSource = _a.transportSource;
        var basePath = this.options.basePath;
        var localSource = Object.assign(transportSource, globalSource);
        var pathFrom = path.join(basePath, this.render.render(transport.from, localSource));
        var pathTo = path.join(basePath, this.render.render(transport.to, localSource));
        return {
            from: pathFrom,
            to: pathTo
        };
    };
    Generator.prototype.transport = function (_a) {
        var transport = _a.transport, globalSource = _a.globalSource, transportSource = _a.transportSource;
        var localSource = Object.assign(transportSource, globalSource);
        var resolvedPaths = this.resolvePaths({ transport: transport, globalSource: globalSource, transportSource: transportSource });
        // Get file content
        var fromContentFile = file_1.getUtf8File(resolvedPaths.from);
        // Render the content file with args
        var fromContentRendered = this.render.render(fromContentFile, localSource);
        file_1.writeUtf8File(resolvedPaths.to, fromContentRendered);
    };
    return Generator;
}());
exports.default = Generator;
