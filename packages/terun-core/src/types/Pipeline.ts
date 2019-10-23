import { lowerCase, upperCase, underscore, capitalize, clearWhitespace, firstLower, firstUpper } from '../utils/index';

export const defaultPipelines = {
    upper: upperCase,
    lower: lowerCase,
    under: underscore,
    cap: capitalize,
    clear_space: clearWhitespace,
    flower: firstLower,
    llower: firstUpper
};