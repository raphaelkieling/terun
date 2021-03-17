import * as File from "./file";
import * as Log from "./log";
import * as _String from "underscore.string";

export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function lowerCase(value: string) {
  if (isNullOrUndefined(value)) return "";
  return value.toLowerCase();
}

export function upperCase(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return value.toUpperCase();
}

export function replace(
  value: string,
  search: string | RegExp,
  replace: any
): string {
  if (isNullOrUndefined(value)) return "";
  if (isNullOrUndefined(search)) return "";
  if (isNullOrUndefined(replace)) return "";
  return value.replace(search, replace);
}

export function levenshtein(value1: string, value2: string): number {
  return _String.levenshtein(value1, value2);
}

export function capitalize(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return _String.capitalize(value);
}

export function titlecase(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return _String.titleize(value);
}

export function camelcase(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return _String.camelize(value);
}

export function firstLower(value: any): string {
  if (isNullOrUndefined(value)) return "";
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function firstUpper(value: any): string {
  if (isNullOrUndefined(value)) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function trim(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return value.trim();
}

export function clearWhitespace(value: string): string {
  if (isNullOrUndefined(value)) return "";
  return value.replace(/\s+/g, "");
}

export function underscore(value: string): string {
  if (isNullOrUndefined(value)) return "";

  return _String.underscored(value);
}

export default { File, Log };
