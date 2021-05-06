import { getUtf8File } from "../../src/utils/file";
import * as path from "path";

const resolvePath = path.resolve.bind(path.resolve, __dirname);

describe("File", () => {
  it("should return a valid utf-8 file", () => {
    const content = getUtf8File(resolvePath("../fixtures/util1.txt"));
    expect(content).toBeTruthy();
    expect(content).toContain("helló wórl~d^`");
  });

  it("should return a empty file", () => {
    const content = getUtf8File(resolvePath("../fixtures/util2.txt"));
    expect(content).toContain("");
  });

  it("should return diferrent encode", () => {
    const content = getUtf8File(resolvePath("../fixtures/util3.txt"));
    expect(content).toContain("你好，世界");
  });

  it("should return a error if dont have a exiting file", () => {
    try {
      getUtf8File("x");
    } catch (e) {
      expect(e.message).toBe("ENOENT: no such file or directory, open 'x'");
    }
  });
});
