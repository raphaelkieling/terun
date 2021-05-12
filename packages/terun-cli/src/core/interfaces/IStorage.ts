export type IStorage = {
    exist(path: string): boolean;
    write(path: string, content: string): void;
    read(path: string): string;
};
