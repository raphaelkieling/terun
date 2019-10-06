export declare abstract class Command {
    name: string;
    constructor(name: string);
    abstract configure(...args: any): void;
    abstract execute(...args: any): void;
}
