"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const pack = __importStar(require("../../package.json"));
const AllCommand_1 = require("./commands/AllCommand");
const InitCommand_1 = require("./commands/InitCommand");
const TransportCommand_1 = require("./commands/TransportCommand");
const ui_1 = require("./ui");
!(async () => {
    const version = pack.version;
    ui_1.success(ui_1.getBanner(version));
    commander_1.default.version(version);
    new AllCommand_1.AllCommand().handle(commander_1.default);
    new InitCommand_1.InitCommand().handle(commander_1.default);
    new TransportCommand_1.TransportCommand().handle(commander_1.default);
    commander_1.default.parse(process.argv);
})();
