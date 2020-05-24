export interface IPage {
    _id?: string;
    path: string;
    title: string;
    description: string;
    staging: string[];
    production: string[];
}
