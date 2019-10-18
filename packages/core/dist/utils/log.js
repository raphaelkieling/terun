"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var colorWarning = chalk_1.default.keyword('orange');
var colorError = chalk_1.default.bold.red;
exports.log = console.log;
function warn(value) {
    exports.log(colorWarning(value));
}
exports.warn = warn;
function error(value) {
    exports.log(colorError(value));
}
exports.error = error;
