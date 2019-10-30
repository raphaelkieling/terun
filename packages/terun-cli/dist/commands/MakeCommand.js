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
var fs = require("fs");
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
            .readParam('override');
    };
    MakeCommand.prototype.getArgsWithPrompts = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _i, args_1, arg, type, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        _i = 0, args_1 = args;
                        _a.label = 1;
                    case 1:
                        if (!(_i < args_1.length)) return [3 /*break*/, 4];
                        arg = args_1[_i];
                        type = arg.choices ? "select" : "text";
                        return [4 /*yield*/, prompts({
                                type: type,
                                message: arg.label,
                                choices: arg.choices ? arg.choices : [],
                                name: arg.variable,
                                initial: arg.default
                            }, prompts_1.defaultConfig)];
                    case 2:
                        result = _a.sent();
                        params[arg.variable] = result[arg.variable];
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
            var commandName, generator, command, globalSource, _i, _a, plugin, transports, _b, transports_1, transport, transportSource, resolvedPaths, defaultIsOverride, fileExists, override, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('porra');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 14, , 15]);
                        this.config = ConfigReader_1.ConfigReader.find();
                        console.log(this.config);
                        if (!this.config) {
                            core_1.Utils.Log.error("Config file terun.js not found");
                            return [2 /*return*/];
                        }
                        commandName = this.params.get('make');
                        generator = new core_1.Generator(this.config);
                        command = generator.getCommand(commandName);
                        if (!command) return [3 /*break*/, 12];
                        globalSource = {};
                        if (command.plugins) {
                            for (_i = 0, _a = command.plugins; _i < _a.length; _i++) {
                                plugin = _a[_i];
                                generator.pluginManager.addPlugin(plugin);
                            }
                            generator.installPlugins();
                        }
                        if (!command.args) return [3 /*break*/, 3];
                        command.args = ArgsMapper_1.default.fromList(command.args);
                        core_1.Utils.Log.log("[Global arguments]");
                        return [4 /*yield*/, this.getArgsWithPrompts(command.args)];
                    case 2:
                        globalSource = _c.sent();
                        _c.label = 3;
                    case 3:
                        transports = command.transports;
                        _b = 0, transports_1 = transports;
                        _c.label = 4;
                    case 4:
                        if (!(_b < transports_1.length)) return [3 /*break*/, 11];
                        transport = transports_1[_b];
                        core_1.Utils.Log.log("[process]: " + (transport.name || transport.from));
                        transport.args = ArgsMapper_1.default.fromList(transport.args);
                        return [4 /*yield*/, this.getArgsWithPrompts(transport.args)];
                    case 5:
                        transportSource = _c.sent();
                        return [4 /*yield*/, generator.resolvePaths({ transport: transport, globalSource: globalSource, transportSource: transportSource })];
                    case 6:
                        resolvedPaths = _c.sent();
                        defaultIsOverride = this.params.get('override') !== true;
                        fileExists = fs.existsSync(resolvedPaths.to);
                        if (!(fileExists && defaultIsOverride)) return [3 /*break*/, 8];
                        return [4 /*yield*/, prompts_1.canOverride()];
                    case 7:
                        override = _c.sent();
                        if (!override) {
                            core_1.Utils.Log.warn("Relax, file skyped");
                            return [2 /*return*/];
                        }
                        ;
                        _c.label = 8;
                    case 8: return [4 /*yield*/, generator.transport({
                            transportSource: transportSource,
                            globalSource: globalSource,
                            transport: transport,
                        })];
                    case 9:
                        _c.sent();
                        core_1.Utils.Log.success("File transported with success!");
                        _c.label = 10;
                    case 10:
                        _b++;
                        return [3 /*break*/, 4];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        core_1.Utils.Log.error("Command [" + commandName + "] not found on config");
                        _c.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        e_1 = _c.sent();
                        console.log(e_1);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return MakeCommand;
}(Command_1.Command));
exports.MakeCommand = MakeCommand;
