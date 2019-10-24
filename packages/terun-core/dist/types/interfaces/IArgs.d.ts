export interface IArgs {
    label: string;
    variable: string;
    default?: any;
    choices?: Array<{
        title: string;
        value: any;
    }>;
}
