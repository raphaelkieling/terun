"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.info = exports.success = exports.error = exports.warn = exports.prettyJSON = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const debug_1 = __importDefault(require("debug"));
const colorWarning = chalk_1.default.keyword('orange');
const colorError = chalk_1.default.bold.red;
const colorSuccess = chalk_1.default.bold.green;
const colorInfo = chalk_1.default.blueBright;
exports.log = console.log;
function prettyJSON(value) {
    exports.log(JSON.stringify(value, null, 2));
}
exports.prettyJSON = prettyJSON;
function warn(value) {
    exports.log(colorWarning(value, '\n'));
}
exports.warn = warn;
function error(value) {
    exports.log(colorError(value, '\n'));
}
exports.error = error;
function success(value) {
    exports.log(colorSuccess(value, '\n'));
}
exports.success = success;
function info(value) {
    exports.log(colorInfo(value, '\n'));
}
exports.info = info;
function debug(namespace = 'terun') {
    return debug_1.default(namespace);
}
exports.debug = debug;
