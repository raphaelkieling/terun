"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe('Pipelines', () => {
    let words = [];
    beforeEach(() => {
        words = [
            'BaNaNa',
            'heLLO worLd',
            'kiLLER',
            'DEBUG',
            'DEVELOPMENT',
            '__DEV__',
            'Pay',
            'CAR',
            'mechanical life',
            '',
        ];
    });
    it('should return a lowercase string', () => {
        const expected = [
            'banana',
            'hello world',
            'killer',
            'debug',
            'development',
            '__dev__',
            'pay',
            'car',
            'mechanical life',
            '',
        ];
        const transformed = words.map(utils_1.StringUtils.lowerCase);
        expect(transformed).toEqual(expected);
    });
    it('should return a uppercase string ', () => {
        const expected = [
            'BANANA',
            'HELLO WORLD',
            'KILLER',
            'DEBUG',
            'DEVELOPMENT',
            '__DEV__',
            'PAY',
            'CAR',
            'MECHANICAL LIFE',
            '',
        ];
        const transformed = words.map(utils_1.StringUtils.upperCase);
        expect(transformed).toEqual(expected);
    });
    it('should return a capitalize string ', () => {
        const expected = [
            'BaNaNa',
            'HeLLO worLd',
            'KiLLER',
            'DEBUG',
            'DEVELOPMENT',
            '__DEV__',
            'Pay',
            'CAR',
            'Mechanical life',
            '',
            'Asd Asd',
            'Test_    test',
            'CapPITALIZE',
            '  three possibility now here  ',
        ];
        const contatMore = ['asd Asd', 'test_    test', 'capPITALIZE', '  three possibility now here  '];
        const transformed = words.concat(contatMore).map(utils_1.StringUtils.capitalize);
        expect(transformed).toEqual(expected);
    });
    it('should return a string with firstLower word', () => {
        const expected = [
            'baNaNa',
            'heLLO worLd',
            'kiLLER',
            'dEBUG',
            'dEVELOPMENT',
            '__DEV__',
            'pay',
            'cAR',
            'mechanical life',
            '',
        ];
        const transformed = words.map(utils_1.StringUtils.firstLower);
        expect(transformed).toEqual(expected);
    });
    it('should return a string with firstUpper word', () => {
        const expected = [
            'BaNaNa',
            'HeLLO worLd',
            'KiLLER',
            'DEBUG',
            'DEVELOPMENT',
            '__DEV__',
            'Pay',
            'CAR',
            'Mechanical life',
            '',
        ];
        const transformed = words.map(utils_1.StringUtils.firstUpper);
        expect(transformed).toEqual(expected);
    });
    it('should return a trimed string', () => {
        const expected = [
            'BaNaNa',
            'heLLO worLd',
            'kiLLER',
            'DEBUG',
            'DEVELOPMENT',
            '__DEV__',
            'Pay',
            'CAR',
            'mechanical life',
            '',
            'hello',
            'more tests now',
        ];
        const toConcat = ['          hello', '   more tests now '];
        const transformed = words.concat(toConcat).map(utils_1.StringUtils.trim);
        expect(transformed).toEqual(expected);
    });
    it('should return a underscored string', () => {
        const toTest = ['MyEntity', 'My Personal Entity', 'DEV', '  hello'];
        const expected = ['my_entity', 'my_personal_entity', 'dev', 'hello'];
        const transformed = toTest.map(utils_1.StringUtils.underscore);
        expect(transformed).toEqual(expected);
    });
    it('should return that a word is very similar using levenshtein algorithm', () => {
        const commands = ['make', 'commands', 'init'];
        const defaultSimilarity = 2;
        const results = [
            utils_1.StringUtils.levenshtein(commands[0], 'made') < defaultSimilarity,
            utils_1.StringUtils.levenshtein(commands[0], 'male') < defaultSimilarity,
            utils_1.StringUtils.levenshtein(commands[1], 'cummands') < defaultSimilarity,
            utils_1.StringUtils.levenshtein(commands[2], 'enit') < defaultSimilarity,
            utils_1.StringUtils.levenshtein(commands[2], 'inity') < defaultSimilarity,
        ];
        expect(results.every((a) => a)).toBe(true);
    });
});
