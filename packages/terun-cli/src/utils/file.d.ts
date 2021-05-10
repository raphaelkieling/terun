export declare function getUtf8File(path: string): string;
export declare function writeUtf8File(path: string, data: string): void;
export declare function existFile(path: string): boolean;
/**
 * Create a path folders in a recursive way. Allow unix and window so.
 * @param path
 */
export declare function createDir(path: string): void;
