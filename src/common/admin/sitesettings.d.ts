
export interface INavigationItem {
    _id?: string;
    pageId: string;
    parent?: string;
}

export interface ISiteSettings {
    selectedTheme: {
        moduleId: string;
        themeName: string;
    };
    navigationItems: INavigationItem[];
}
