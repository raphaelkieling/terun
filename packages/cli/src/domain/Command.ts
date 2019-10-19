export abstract class Command {
    name: string;
    protected params: Map<string, any> = new Map();
    private paramsToGet: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public readParam(param: string): this {
        this.paramsToGet.push(param);
        return this;
    }

    public setArgs(data: any): void {
        for (const param of this.paramsToGet) {
            this.params.set(param, data[param]);
        }
    }

    abstract configure(...args: any): void;
    abstract execute(...args: any): void;
}