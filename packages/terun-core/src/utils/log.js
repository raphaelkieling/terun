"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var colorWarning = chalk_1["default"].keyword('orange');
var colorError = chalk_1["default"].bold.red;
var colorSuccess = chalk_1["default"].bold.green;
exports.log = console.log;
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
