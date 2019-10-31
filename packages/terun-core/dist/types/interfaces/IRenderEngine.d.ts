export interface IRenderEngine {
    /**
     * Compile the template string to a string rendered.
     * Like `{{name}}` with:
     *
     * ```
     * {
     *  name: 'MyDisplayName'
     * }
     * ```
     * rendered to MyDisplayName.
     *
     * @param template String not compiled
     * @param args A object with the params to use inside compile
     * @param tags A array of string to delimit the tags
     */
    render(template: string, args: object, tags: string[]): Promise<string>;
}
