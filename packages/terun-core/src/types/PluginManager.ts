import IPlugin from './interfaces/IPlugin';
import { RenderData } from './interfaces/IPlugin';
import { ITransport } from './interfaces/ITransport';
import { IConfig } from './interfaces/IConfig';

export default class PluginManager {
    plugins: IPlugin[] = [];

    addPlugin(plugin: IPlugin) {
        this.plugins.push(plugin);
    }

    async configure(config: IConfig): Promise<void> {
        for (const plugin of this.plugins) {
            if (plugin.configure)
                await plugin.configure({ config });
        }
    }

    async onInit(): Promise<void> {
        for (const plugin of this.plugins) {
            if (plugin.onInit)
                await plugin.onInit();
        }
    }

    async onTransport(transport: ITransport): Promise<void> {
        for (const plugin of this.plugins) {
            if (plugin.onTransport)
                await plugin.onTransport({ transport });
        }
    }

    async beforeRender(localArgs: RenderData): Promise<RenderData> {
        const renderData: RenderData = localArgs;

        for (const plugin of this.plugins) {
            if (plugin.beforeRender)
                Object.assign(renderData, await plugin.beforeRender({ localArgs }));
        }

        return renderData;
    }

    async done(): Promise<boolean> {
        let done = true;

        for (const plugin of this.plugins) {
            if (plugin.done)
                done = await plugin.done();
        }

        return done;
    }
}