import { notify } from 'node-notifier';
import IPlugin, { Hooks } from '@terun/core/dist/types/interfaces/IPlugin';

type NotifyPluginParams = {
    title?: string;
    message?: string;
}

class NotifyPlugin implements IPlugin {
    name: string = 'Notify';
    options: NotifyPluginParams;

    constructor(params?: NotifyPluginParams) {
        this.options = Object.assign({
            title: 'Terun done',
            message: 'It\'s done with success'
        }, params);
    }

    install(hooks: Hooks) {
        hooks.done.tap("NotifyPlugin", () => {
            notify({
                title: this.options.title,
                message: this.options.message
            });
        });
    }
}

export = NotifyPlugin;