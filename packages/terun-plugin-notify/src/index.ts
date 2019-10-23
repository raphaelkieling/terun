import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { OnTransportParams, BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';
import { notify } from 'node-notifier';

export type NotifyPluginParams = {
    title?: string;
    message?: string;
}

export default class NotifyPlugin implements IPlugin {
    name: string = 'Notify';
    options: NotifyPluginParams;

    constructor(params?: NotifyPluginParams) {
        this.options = Object.assign({
            title: 'Terun done',
            message: 'It\'s done with success'
        }, params);
    }

    async configure(params: ConfigureParams): Promise<void> {
    }
    async onInit(): Promise<void> {
    }
    async onTransport(params: OnTransportParams): Promise<void> {
    }
    async beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData> {
        return localArgs;
    }

    async done(): Promise<boolean> {
        notify({
            title: this.options.title,
            message: this.options.message
        });
        return true;
    }
}