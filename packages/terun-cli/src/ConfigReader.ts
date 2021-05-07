import * as path from "path";
import { getCurrentFolderPath } from "./utils";
import { Utils } from "@terun/core";
import { IConfigExternal } from "@terun/core/types/interfaces";

export class ConfigReader {
  static CONFIG_FILE_NAME = "terun.js";

  static find(): IConfigExternal | null {
    try {
      const configPath = path.join(
        getCurrentFolderPath(),
        ConfigReader.CONFIG_FILE_NAME
      );

      return require(configPath);
    } catch (err) {
      return null;
    }
  }

  static exist(): boolean {
    try {
      const configPath = path.join(
        getCurrentFolderPath(),
        ConfigReader.CONFIG_FILE_NAME
      );
      return Utils.File.existFile(configPath);
    } catch (e) {
      return false;
    }
  }

  static create(data: string): void {
    try {
      const configPath = path.join(
        getCurrentFolderPath(),
        ConfigReader.CONFIG_FILE_NAME
      );
      return Utils.File.writeUtf8File(configPath, data);
    } catch (e) {
      Utils.Log.error(e);
    }
  }
}
