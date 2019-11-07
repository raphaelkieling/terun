import { lowerCase, upperCase, underscore, capitalize, clearWhitespace, firstLower, firstUpper } from '../utils/index';

export const defaultPipelines = {
    uppercase: upperCase,
    lowercase: lowerCase,
    underscore: underscore,
    capitalize,
    clearspace: clearWhitespace,
    firstlower: firstLower,
    firstupper: firstUpper
};