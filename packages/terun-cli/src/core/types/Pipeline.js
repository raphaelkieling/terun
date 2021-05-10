"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPipelines = void 0;
const utils_1 = require("../../utils");
exports.defaultPipelines = {
    uppercase: utils_1.StringUtils.upperCase,
    lowercase: utils_1.StringUtils.lowerCase,
    underscore: utils_1.StringUtils.underscore,
    capitalize: utils_1.StringUtils.capitalize,
    clearspace: utils_1.StringUtils.clearWhitespace,
    firstlower: utils_1.StringUtils.firstLower,
    firstupper: utils_1.StringUtils.firstUpper,
};
