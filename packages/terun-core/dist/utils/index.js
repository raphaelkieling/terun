"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File = require("./file");
var Log = require("./log");
var util_1 = require("util");
function lowerCase(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.toLowerCase();
}
exports.lowerCase = lowerCase;
function upperCase(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.toUpperCase();
}
exports.upperCase = upperCase;
function replace(value, search, replace) {
    if (util_1.isNullOrUndefined(value))
        return '';
    if (util_1.isNullOrUndefined(search))
        return '';
    if (util_1.isNullOrUndefined(replace))
        return '';
    return value.replace(search, replace);
}
exports.replace = replace;
function capitalize(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return replace(value, /^\w/, upperCase);
}
exports.capitalize = capitalize;
function firstLower(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.charAt(0).toLowerCase() + value.slice(1);
}
exports.firstLower = firstLower;
function firstUpper(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}
exports.firstUpper = firstUpper;
function trim(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.trim();
}
exports.trim = trim;
function clearWhitespace(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    return value.replace(/\s+/g, '');
}
exports.clearWhitespace = clearWhitespace;
function underscore(value) {
    if (util_1.isNullOrUndefined(value))
        return '';
    value = clearWhitespace(firstLower(value));
    var putUnderscore = function (letter) {
        return letter.match(/[A-Z]/g) ? "_" + lowerCase(letter) : letter;
    };
    return value.split('').map(putUnderscore).join('');
}
exports.underscore = underscore;
exports.default = { File: File, Log: Log };
