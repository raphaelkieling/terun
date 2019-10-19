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
                        return [4 /*yield*/, prompts({
                                type: "text",
                                message: arg.label,
                                name: arg.variable,
                                initial: arg.default
                            })];
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
            var commandName, generator, command, globalSource, transports, _i, transports_1, transport, transportSource, resolvedPaths, override, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.config = ConfigReader_1.ConfigReader.find();
                        if (!this.config) {
                            core_1.Utils.Log.error("Config file terun.js not found");
                            return [2 /*return*/];
                        }
                        commandName = this.params.get('make');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        generator = new core_1.Generator(this.config);
                        command = generator.getCommand(commandName);
                        if (!command) return [3 /*break*/, 8];
                        core_1.Utils.Log.log("[Global arguments]");
                        return [4 /*yield*/, this.getArgsWithPrompts(command.args)];
                    case 2:
                        globalSource = _a.sent();
                        transports = command.transports;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 8];
                        transport = transports_1[_i];
                        core_1.Utils.Log.log("[process]: " + transport.name);
                        return [4 /*yield*/, this.getArgsWithPrompts(transport.args)];
                    case 4:
                        transportSource = _a.sent();
                        resolvedPaths = generator.resolvePaths({ transport: transport, globalSource: globalSource, transportSource: transportSource });
                        if (!(fs.existsSync(resolvedPaths.to) && this.params.get('override') !== true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, prompts_1.canOverride()];
                    case 5:
                        override = _a.sent();
                        if (!override) {
                            core_1.Utils.Log.warn("Relax, file skyped");
                            return [2 /*return*/];
                        }
                        ;
                        _a.label = 6;
                    case 6:
                        generator.transport({
                            transportSource: transportSource,
                            globalSource: globalSource,
                            transport: transport,
                        });
                        core_1.Utils.Log.success("File transported with success!");
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        core_1.Utils.Log.error(e_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return MakeCommand;
}(Command_1.Command));
exports.MakeCommand = MakeCommand;
