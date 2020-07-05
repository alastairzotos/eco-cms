export interface IPageComponent {
    type: [string, string],
    order: number,
    props: { [key: string]: any },
    children?: IPageComponent[]
}

export interface IPageColumn {
    span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    children?: IPageComponent[];
}

export interface IPageRow {
    columns?: IPageColumn[];
}

export interface IPageContent {
    rows: IPageRow[];
}

export interface IPage {
    _id?: string;
    path: string;
    title: string;
    description: string;
    staging: IPageContent[];
    production: IPageContent[];
}
