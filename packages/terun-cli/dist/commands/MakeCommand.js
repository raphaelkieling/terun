"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var Command_1 = require("./Command");
var core_1 = require("@terun/core");
var ConfigReader_1 = require("../ConfigReader");
var prompts = require("prompts");
var prompts_1 = require("../utils/prompts");
var ArgsMapper_1 = require("../dataMapper/ArgsMapper");
var MakeCommand = /** @class */ (function (_super) {
    __extends(MakeCommand, _super);
    function MakeCommand() {
        var _this = _super.call(this, 'make') || this;
        _this.config = null;
        return _this;
    }
    MakeCommand.prototype.configure = function () {
        this
            .readParam('make')
            .readParam('override')
            .readParam('debug');
    };
    MakeCommand.prototype.getArgsWithPrompts = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _i, args_1, arg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        _i = 0, args_1 = args;
                        _a.label = 1;
                    case 1:
                        if (!(_i < args_1.length)) return [3 /*break*/, 4];
                        arg = args_1[_i];
                        return [4 /*yield*/, prompts(arg, prompts_1.defaultConfig)];
                    case 2:
                        result = _a.sent();
                        params = __assign({}, params, result);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, params];
                }
            });
        });
    };
    MakeCommand.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commandName, generator, command_1, _i, _a, plugin, transports, _b, transports_1, transport, transportSource, defaultIsOverride, defaultDebug, e_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        this.config = ConfigReader_1.ConfigReader.find();
                        if (!this.config) {
                            core_1.Utils.Log.error("Config file terun.js not found");
                            return [2 /*return*/];
                        }
                        commandName = this.params.get('make');
                        generator = new core_1.Generator(this.config);
                        command_1 = generator.getCommand(commandName);
                        if (!command_1) {
                            core_1.Utils.Log.error("Command [" + commandName + "] not found on config");
                            return [2 /*return*/];
                        }
                        if (command_1.hook && typeof command_1.hook === 'function')
                            command_1.hook(generator.hooks);
                        generator.hooks.fileExists.tapPromise("CLI", function () {
                            return prompts_1.canOverride();
                        });
                        generator.hooks.fileSkipped.tap("CLI", function () {
                            core_1.Utils.Log.warn("Relax, file skyped");
                        });
                        generator.hooks.done.tap("CLI", function () {
                            core_1.Utils.Log.success("File transported with success!");
                        });
                        if (command_1.plugins) {
                            for (_i = 0, _a = command_1.plugins; _i < _a.length; _i++) {
                                plugin = _a[_i];
                                generator.pluginManager.addPlugin(plugin);
                            }
                        }
                        generator.hooks.global.tapPromise("CLI", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        core_1.Utils.Log.log("[Global arguments]");
                                        return [4 /*yield*/, this.getArgsWithPrompts(command_1.args)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, generator.init()];
                    case 1:
                        _c.sent();
                        transports = command_1.transports;
                        _b = 0, transports_1 = transports;
                        _c.label = 2;
                    case 2:
                        if (!(_b < transports_1.length)) return [3 /*break*/, 6];
                        transport = transports_1[_b];
                        core_1.Utils.Log.log("[process]: " + (transport.name || transport.from));
                        transport.args = ArgsMapper_1.default.fromList(transport.args);
                        return [4 /*yield*/, this.getArgsWithPrompts(transport.args)];
                    case 3:
                        transportSource = _c.sent();
                        defaultIsOverride = this.params.get('override') !== true;
                        defaultDebug = this.params.get('debug') === true;
                        return [4 /*yield*/, generator.transport({
                                source: transportSource,
                                transport: transport,
                                override: defaultIsOverride,
                                debug: defaultDebug
                            })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _b++;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return MakeCommand;
}(Command_1.Command));
exports.MakeCommand = MakeCommand;
