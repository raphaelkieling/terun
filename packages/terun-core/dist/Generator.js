"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ConfigMapper_1 = require("./types/mappers/ConfigMapper");
var RenderEngineFactory_1 = require("./types/render/RenderEngineFactory");
var utils_1 = require("./utils");
var PluginManager_1 = require("./types/PluginManager");
var tapable_1 = require("tapable");
var fs = require("fs");
/**
 * Get and render the content files in the
 * destiny file. Use commands in options to create
 * scope to transport file.
 */
var Generator = /** @class */ (function () {
    function Generator(config) {
        this.globalConfig = ConfigMapper_1.ConfigMapper.fromConfigExternal(config);
        this.render = RenderEngineFactory_1.default.make(this.globalConfig.engine);
        this.hooks = {
            global: new tapable_1.AsyncSeriesWaterfallHook(["transport", "source"]),
            fileExists: new tapable_1.AsyncSeriesBailHook(),
            fileSkipped: new tapable_1.SyncHook(),
            configure: new tapable_1.SyncHook(["globalConfig"]),
            onTransport: new tapable_1.SyncHook(["transport", "source"]),
            beforeRender: new tapable_1.AsyncSeriesWaterfallHook(["transport", "source"]),
            done: new tapable_1.SyncHook()
        };
        this.pluginManager = new PluginManager_1.default();
    }
    Generator.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.installPlugins();
                        _a = this;
                        return [4 /*yield*/, this.hooks.global.promise()];
                    case 1:
                        _a.globalArg = (_b.sent()) || {};
                        return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.getCommand = function (name) {
        return this.globalConfig.commands[name];
    };
    Generator.prototype.installPlugins = function () {
        this.pluginManager.install(this.hooks);
    };
    Generator.prototype.resolvePaths = function (_a) {
        var transport = _a.transport, source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var basePath, localSource, pathFrom, _b, _c, _d, pathTo, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        basePath = this.globalConfig.basePath;
                        localSource = Object.assign(source);
                        _c = (_b = path).join;
                        _d = [basePath];
                        return [4 /*yield*/, this.render.render(transport.from, localSource, this.globalConfig.tag)];
                    case 1:
                        pathFrom = _c.apply(_b, _d.concat([_h.sent()]));
                        _f = (_e = path).join;
                        _g = [basePath];
                        return [4 /*yield*/, this.render.render(transport.to, localSource, this.globalConfig.tag)];
                    case 2:
                        pathTo = _f.apply(_e, _g.concat([_h.sent()]));
                        return [2 /*return*/, {
                                from: pathFrom,
                                to: pathTo
                            }];
                }
            });
        });
    };
    Generator.prototype.transport = function (_a) {
        var transport = _a.transport, source = _a.source, _b = _a.override, override = _b === void 0 ? false : _b, _c = _a.debug, debug = _c === void 0 ? false : _c;
        return __awaiter(this, void 0, void 0, function () {
            var localSource, localSourcePlugin, resolvedPaths, fileExists, overrideChoice, fromContentFile, fromContentRendered;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.hooks.configure.call(this.globalConfig);
                        this.hooks.onTransport.call(transport, source);
                        localSource = Object.assign(source, this.globalArg);
                        if (debug) {
                            utils_1.default.Log.log(JSON.stringify(localSource, null, 2));
                        }
                        if (!(transport.validator !== null)) return [3 /*break*/, 3];
                        if (!(typeof transport.validator === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, transport.validator({ args: localSource })];
                    case 1:
                        if (!(_d.sent()))
                            return [2 /*return*/];
                        return [3 /*break*/, 3];
                    case 2:
                        if (typeof transport.validator === "boolean") {
                            if (!transport.validator)
                                return [2 /*return*/];
                        }
                        _d.label = 3;
                    case 3: return [4 /*yield*/, this.hooks.beforeRender.promise(localSource)];
                    case 4:
                        localSourcePlugin = (_d.sent()) || localSource;
                        return [4 /*yield*/, this.resolvePaths({ transport: transport, source: source })];
                    case 5:
                        resolvedPaths = _d.sent();
                        fileExists = fs.existsSync(resolvedPaths.to);
                        if (!(fileExists && override)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.hooks.fileExists.promise()];
                    case 6:
                        overrideChoice = _d.sent();
                        if (!overrideChoice) {
                            this.hooks.fileSkipped.call();
                            return [2 /*return*/];
                        }
                        ;
                        _d.label = 7;
                    case 7:
                        fromContentFile = utils_1.default.File.getUtf8File(resolvedPaths.from);
                        return [4 /*yield*/, this.render.render(fromContentFile, localSourcePlugin, this.globalConfig.tag)];
                    case 8:
                        fromContentRendered = _d.sent();
                        return [4 /*yield*/, utils_1.default.File.createDir(resolvedPaths.to)];
                    case 9:
                        _d.sent();
                        utils_1.default.File.writeUtf8File(resolvedPaths.to, fromContentRendered);
                        this.hooks.done.call(transport, source);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
exports.default = Generator;
