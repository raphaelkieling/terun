import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { OnTransportParams, BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';
declare type NotifyPluginParams = {
    title?: string;
    message?: string;
};
declare class NotifyPlugin implements IPlugin {
    name: string;
    options: NotifyPluginParams;
    constructor(params?: NotifyPluginParams);
    configure(params: ConfigureParams): Promise<void>;
    onInit(): Promise<void>;
    onTransport(params: OnTransportParams): Promise<void>;
    beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData>;
    done(): Promise<boolean>;
}
export = NotifyPlugin;
