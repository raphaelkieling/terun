import * as File from './file';
import * as Log from './log';
export declare function lowerCase(value: string): string;
export declare function upperCase(value: string): string;
export declare function replace(value: string, search: any, replace: any): string;
export declare function capitalize(value: string): string;
export declare function firstLower(value: any): any;
export declare function firstUpper(value: any): any;
export declare function trim(value: string): string;
export declare function clearWhitespace(value: string): string;
export declare function underscore(value: string): string;
declare const _default: {
    File: typeof File;
    Log: typeof Log;
};
export default _default;
