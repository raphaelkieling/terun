import * as File from './file';
import * as Log from './log';
import { isNullOrUndefined } from 'util';

export function lowerCase(value: string) {
    if (isNullOrUndefined(value)) return '';
    return value.toLowerCase();
}

export function upperCase(value: string) {
    if (isNullOrUndefined(value)) return '';
    return value.toUpperCase();
}

export function replace(value: string, search: any, replace: any) {
    if (isNullOrUndefined(value)) return '';
    if (isNullOrUndefined(search)) return '';
    if (isNullOrUndefined(replace)) return '';
    return value.replace(search, replace);
}

export function capitalize(value: string) {
    if (isNullOrUndefined(value)) return '';
    return replace(value, /^\w/, upperCase);
}

export function firstLower(value: any) {
    if (isNullOrUndefined(value)) return '';
    return value.charAt(0).toLowerCase() + value.slice(1);
}

export function firstUpper(value: any) {
    if (isNullOrUndefined(value)) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function trim(value: string) {
    if (isNullOrUndefined(value)) return '';
    return value.trim();
}

export function clearWhitespace(value: string) {
    if (isNullOrUndefined(value)) return '';
    return value.replace(/\s+/g, '');
}

export function underscore(value: string) {
    if (isNullOrUndefined(value)) return '';

    value = clearWhitespace(firstLower(value));

    const putUnderscore = (letter: string) =>
        letter.match(/[A-Z]/g) ? `_${lowerCase(letter)}` : letter;

    return value.split('').map(putUnderscore).join('');
}

export default { File, Log }