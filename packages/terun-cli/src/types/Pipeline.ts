import { StringUtils } from '../utils';

export const defaultPipelines = {
    uppercase: StringUtils.upperCase,
    lowercase: StringUtils.lowerCase,
    underscore: StringUtils.underscore,
    capitalize: StringUtils.capitalize,
    clearspace: StringUtils.clearWhitespace,
    firstlower: StringUtils.firstLower,
    firstupper: StringUtils.firstUpper,
};
