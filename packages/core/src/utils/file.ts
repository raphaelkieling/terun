import * as fs from "fs";

export function getUtf8File(path: string): string {
  return fs.readFileSync(path, { encoding: "utf-8" });
}

export function writeUtf8File(path: string, data: string) {
  return fs.writeFileSync(path, data, { encoding: "utf-8" });
}
