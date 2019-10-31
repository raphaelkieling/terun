"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArgsMapper = /** @class */ (function () {
    function ArgsMapper() {
    }
    ArgsMapper.fromString = function (value) {
        return {
            type: "text",
            initial: '',
            message: value,
            name: value,
        };
    };
    ArgsMapper.fromList = function (values) {
        return values.map(function (val) {
            if (typeof val === 'string') {
                return ArgsMapper.fromString(val);
            }
            else {
                return val;
            }
        });
    };
    return ArgsMapper;
}());
exports.default = ArgsMapper;
