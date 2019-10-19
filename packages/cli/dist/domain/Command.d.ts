export declare abstract class Command {
    name: string;
    protected params: Map<string, any>;
    private paramsToGet;
    constructor(name: string);
    readParam(param: string): this;
    setArgs(data: any): void;
    abstract configure(...args: any): void;
    abstract execute(...args: any): void;
}
