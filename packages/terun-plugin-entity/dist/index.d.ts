import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';
declare type EntityPluginOptions = {
    basePath: string;
};
declare class EntityPlugin implements IPlugin {
    name: string;
    options: EntityPluginOptions;
    fieldTypes: string[];
    constructor(params: EntityPluginOptions);
    makeQuestions(): Promise<{}>;
    configure(params: ConfigureParams): Promise<void>;
    beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData>;
}
export = EntityPlugin;
