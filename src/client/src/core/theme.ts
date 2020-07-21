import { IPage2 } from '@common*';
import { Dictionary } from 'lodash';
import * as React from 'react';

export interface IThemeRenderProps {
    page: IPage2;
}

export interface ITheme {
    name: string;
    pageTypes: string[];

    renderPage: Dictionary<React.FC<IThemeRenderProps>>;
}
