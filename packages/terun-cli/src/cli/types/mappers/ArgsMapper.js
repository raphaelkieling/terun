"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArgsMapper {
    static fromString(value) {
        return {
            type: 'text',
            initial: '',
            message: value,
            name: value,
        };
    }
    static fromList(values) {
        return values.map((val) => {
            if (typeof val === 'string') {
                return ArgsMapper.fromString(val);
            }
            else {
                return val;
            }
        });
    }
}
exports.default = ArgsMapper;
