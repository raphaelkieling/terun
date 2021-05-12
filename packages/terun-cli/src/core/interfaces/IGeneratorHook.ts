import { SyncHook } from 'tapable';

export interface IGeneratorHook {
    global: SyncHook;
    fileExists: SyncHook;
    fileSkipped: SyncHook;
    configure: SyncHook;
    onTransport: SyncHook;
    beforeRender: SyncHook;
    done: SyncHook;
}
