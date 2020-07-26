export interface INavigationInfo {
    parentPage: IPage;
    selected: boolean;
}

export interface IPage {
    _id?: string;
    path: string;
    title: string;
    description: string;
    pageType: string;
    content: string;
    published: boolean;
    navigation: INavigationInfo;
}
