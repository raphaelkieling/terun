import { SyncHook } from 'tapable';
import { IGeneratorHook } from './types/interfaces/IGeneratorHook';
export declare class GeneratorHook implements IGeneratorHook {
    global: SyncHook;
    fileExists: SyncHook;
    fileSkipped: SyncHook;
    configure: SyncHook;
    onTransport: SyncHook;
    beforeRender: SyncHook;
    done: SyncHook;
    constructor();
}
