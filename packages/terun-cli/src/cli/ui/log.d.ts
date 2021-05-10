import debugLibrary from 'debug';
export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare function prettyJSON(value: Record<string, unknown>): void;
export declare function warn(value: string): void;
export declare function error(value: string): void;
export declare function success(value: string): void;
export declare function info(value: string): void;
export declare function debug(namespace?: string): debugLibrary.Debugger;
