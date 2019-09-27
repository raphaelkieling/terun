export abstract class Command {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract configure(...args: any): void;
    abstract execute(...args: any): void;
}