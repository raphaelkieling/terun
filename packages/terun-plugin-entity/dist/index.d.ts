import IPlugin, { Hooks } from '@terun/core/dist/types/interfaces/IPlugin';
declare type EntityPluginOptions = {
    basePath: string;
};
declare class EntityPlugin implements IPlugin {
    name: string;
    options: EntityPluginOptions;
    fieldTypes: string[];
    constructor(params: EntityPluginOptions);
    makeQuestions(): Promise<{}>;
    install(hooks: Hooks): void;
}
export = EntityPlugin;
