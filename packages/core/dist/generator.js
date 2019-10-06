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
    /**
     *
     * Init the transport with a command name, it's is a entry
     * point to generator to create files.
     *
     * ```js
     * commands:{
     *    makeCrud: {
     *      ...
     *    }
     * }
     * ```
     *
     * Use commandName param with "makeCrud".
     *
     * @param commandName string with name key
     */
    Generator.prototype.initTransport = function (commandName) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = this.getCommand(commandName);
                        if (!command) {
                            throw new Error("Command not found");
                        }
                        return [4 /*yield*/, this.transportByCommand(command)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Generator.prototype.transportByCommand = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var transports, _i, transports_1, transportInstance;
            return __generator(this, function (_a) {
                transports = command.transports;
                for (_i = 0, transports_1 = transports; _i < transports_1.length; _i++) {
                    transportInstance = transports_1[_i];
                    this.transport({
                        globalSource: command.getSource(),
                        transport: transportInstance,
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    Generator.prototype.getCommand = function (name) {
        return this.options.commands[name];
    };
    Generator.prototype.transport = function (_a) {
        var transport = _a.transport, globalSource = _a.globalSource;
        var basePath = this.options.basePath;
        var localSource = Object.assign(transport.getSource(), globalSource);
        var pathFrom = path.join(basePath, this.render.render(transport.from, localSource));
        var pathTo = path.join(basePath, this.render.render(transport.to, localSource));
        // Get file content
        var fromContentFile = file_1.getUtf8File(pathFrom);
        // Render the content file with args
        var fromContentRendered = this.render.render(fromContentFile, localSource);
        file_1.writeUtf8File(pathTo, fromContentRendered);
    };
    return Generator;
}());
exports.default = Generator;
