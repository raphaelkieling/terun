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
Object.defineProperty(exports, "__esModule", { value: true });
exports.underscore = exports.clearWhitespace = exports.trim = exports.firstUpper = exports.firstLower = exports.camelcase = exports.titlecase = exports.capitalize = exports.levenshtein = exports.replace = exports.upperCase = exports.lowerCase = exports.isNullOrUndefined = void 0;
const _String = __importStar(require("underscore.string"));
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
function lowerCase(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.toLowerCase();
}
exports.lowerCase = lowerCase;
function upperCase(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.toUpperCase();
}
exports.upperCase = upperCase;
function replace(value, search, replace) {
    if (isNullOrUndefined(value))
        return '';
    if (isNullOrUndefined(search))
        return '';
    if (isNullOrUndefined(replace))
        return '';
    return value.replace(search, replace);
}
exports.replace = replace;
function levenshtein(value1, value2) {
    return _String.levenshtein(value1, value2);
}
exports.levenshtein = levenshtein;
function capitalize(value) {
    if (isNullOrUndefined(value))
        return '';
    return _String.capitalize(value);
}
exports.capitalize = capitalize;
function titlecase(value) {
    if (isNullOrUndefined(value))
        return '';
    return _String.titleize(value);
}
exports.titlecase = titlecase;
function camelcase(value) {
    if (isNullOrUndefined(value))
        return '';
    return _String.camelize(value);
}
exports.camelcase = camelcase;
function firstLower(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.charAt(0).toLowerCase() + value.slice(1);
}
exports.firstLower = firstLower;
function firstUpper(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}
exports.firstUpper = firstUpper;
function trim(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.trim();
}
exports.trim = trim;
function clearWhitespace(value) {
    if (isNullOrUndefined(value))
        return '';
    return value.replace(/\s+/g, '');
}
exports.clearWhitespace = clearWhitespace;
function underscore(value) {
    if (isNullOrUndefined(value))
        return '';
    return _String.underscored(value);
}
exports.underscore = underscore;
