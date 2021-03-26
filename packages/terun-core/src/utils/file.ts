import * as fs from "fs";
import * as fx from "mkdir-recursive";
import * as ph from "path";

export function getUtf8File(path: string): string {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

export function writeUtf8File(path: string, data: string) {
  return fs.writeFileSync(path, data, { encoding: "utf-8" });
}

/**
 * Create a path folders in a recursive way. Allow unix and window so.
 * @param path
 */
export function createDir(path: string): void {
  fx.mkdirSync(ph.join(...path.split(/[\/\\]/).slice(0, -1)));
}
