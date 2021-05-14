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
     *
     * @returns {Promise<string>} - Resolved template
     */
    render(template: string, args: Record<string, unknown>, tags: string[]): Promise<string>;
}
