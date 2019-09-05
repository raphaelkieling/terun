import IConfig from "./types/interfaces/IConfig";
import { ITransport } from "./types/interfaces/ITransport";
declare class Generator {
    private options;
    private render;
    constructor(options: IConfig);
    transport({ transport, source, }: {
        transport: ITransport;
        source: any;
    }): void;
}
export default Generator;
