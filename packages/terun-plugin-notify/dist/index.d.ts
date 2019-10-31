import IPlugin, { Hooks } from '@terun/core/dist/types/interfaces/IPlugin';
declare type NotifyPluginParams = {
    title?: string;
    message?: string;
};
declare class NotifyPlugin implements IPlugin {
    name: string;
    options: NotifyPluginParams;
    constructor(params?: NotifyPluginParams);
    install(hooks: Hooks): void;
}
export = NotifyPlugin;
