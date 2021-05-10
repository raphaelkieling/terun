import { SyncHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook } from 'tapable';
import { IGeneratorHook } from './types/interfaces/IGeneratorHook';

export class GeneratorHook implements IGeneratorHook {
    global: SyncHook;
    fileExists: SyncHook;
    fileSkipped: SyncHook;
    configure: SyncHook;
    onTransport: SyncHook;
    beforeRender: SyncHook;
    done: SyncHook;

    constructor() {
        this.global = new AsyncSeriesWaterfallHook(['source']);
        this.fileExists = new AsyncSeriesBailHook();
        this.fileSkipped = new SyncHook();
        this.configure = new SyncHook(['globalConfig']);
        this.onTransport = new SyncHook(['transport', 'source']);
        this.beforeRender = new AsyncSeriesWaterfallHook(['source', 'transport', 'compiler']);
        this.done = new SyncHook();
    }
}
