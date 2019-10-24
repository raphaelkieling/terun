import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { OnTransportParams, BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';
declare type EntityPluginOptions = {
    basePath: string;
};
declare class EntityPlugin implements IPlugin {
    name: string;
    options: EntityPluginOptions;
    constructor(params: EntityPluginOptions);
    configure(params: ConfigureParams): Promise<void>;
    onInit(): Promise<void>;
    onTransport(params: OnTransportParams): Promise<void>;
    beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData>;
    done(): Promise<boolean>;
}
export = EntityPlugin;
