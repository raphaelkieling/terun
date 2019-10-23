import { IPlugin } from '@terun/core/dist/types/interfaces';
import { RenderData, ConfigureParams } from '@terun/core/dist/types/interfaces/IPlugin';
import { OnTransportParams, BeforeRenderParams } from '@terun/core/src/types/interfaces/IPlugin';

export type EntityPluginOptions = {
    basePath: string;
}

export default class EntityPlugin implements IPlugin {
    name: string = 'Entity Resolver';
    options: EntityPluginOptions;

    constructor(params: EntityPluginOptions) {
        this.options = params;
    }

    async configure(params: ConfigureParams): Promise<void> {
        console.log('configurando');
    }
    async onInit(): Promise<void> {
        console.log('iniciando');
    }
    async onTransport(params: OnTransportParams): Promise<void> {
        console.log('transportando');
    }
    async beforeRender({ localArgs }: BeforeRenderParams): Promise<RenderData> {
        console.log('renderizando')
        return localArgs;
    }

    async done(): Promise<boolean> {
        console.log('done')
        return true;
    }
}