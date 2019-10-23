import { lowerCase, upperCase, underscore, capitalize, clearWhitespace, firstLower, firstUpper } from '../utils/index';
export declare const defaultPipelines: {
    upper: typeof upperCase;
    lower: typeof lowerCase;
    under: typeof underscore;
    cap: typeof capitalize;
    clear_space: typeof clearWhitespace;
    flower: typeof firstLower;
    llower: typeof firstUpper;
};
