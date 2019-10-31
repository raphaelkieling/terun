import { lowerCase, upperCase, underscore, capitalize, clearWhitespace, firstLower, firstUpper } from '../utils/index';

export const defaultPipelines = {
    uppercase: upperCase,
    lowercase: lowerCase,
    undersoce: underscore,
    capitalize,
    clear_space: clearWhitespace,
    first_lower: firstLower,
    first_upper: firstUpper
};