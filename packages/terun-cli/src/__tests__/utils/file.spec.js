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
const file_1 = require("../../utils/file");
const path = __importStar(require("path"));
const resolvePath = path.resolve.bind(path.resolve, __dirname);
describe('File', () => {
    it('should return a valid utf-8 file', () => {
        const content = file_1.getUtf8File(resolvePath('../fixtures/util1.txt'));
        expect(content).toBeTruthy();
        expect(content).toContain('helló wórl~d^`');
    });
    it('should return a empty file', () => {
        const content = file_1.getUtf8File(resolvePath('../fixtures/util2.txt'));
        expect(content).toContain('');
    });
    it('should return diferrent encode', () => {
        const content = file_1.getUtf8File(resolvePath('../fixtures/util3.txt'));
        expect(content).toContain('你好，世界');
    });
    it('should return a error if dont have a exiting file', () => {
        try {
            file_1.getUtf8File('x');
        }
        catch (e) {
            expect(e.message).toBe("ENOENT: no such file or directory, open 'x'");
        }
    });
});
