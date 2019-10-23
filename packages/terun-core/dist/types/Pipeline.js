"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../utils/index");
exports.defaultPipelines = {
    upper: index_1.upperCase,
    lower: index_1.lowerCase,
    under: index_1.underscore,
    cap: index_1.capitalize,
    clear_space: index_1.clearWhitespace,
    flower: index_1.firstLower,
    llower: index_1.firstUpper
};
