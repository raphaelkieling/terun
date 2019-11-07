import IPlugin, { Hooks } from '@terun/core/dist/types/interfaces/IPlugin';
declare type EntityPluginOptions = {
    dictionary?: {
        [key: string]: string;
    };
};
declare class EntityPlugin implements IPlugin {
    name: string;
    options: EntityPluginOptions;
    fieldTypes: string[];
    constructor(params: EntityPluginOptions);
    makeQuestions(): Promise<{
        fields: {
            last: boolean;
            name: any;
            type: any;
        }[];
        entity: any;
    }>;
    install(hooks: Hooks): void;
}
export = EntityPlugin;
