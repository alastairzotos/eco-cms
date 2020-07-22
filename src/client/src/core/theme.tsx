import { IPage2 } from '@common*';
import { Dictionary } from 'lodash';
import * as React from 'react';
import withSideEffects from 'react-side-effect';

export interface IBodyProps {
    className?: string;
    style?: React.CSSProperties;
}

export const Body = withSideEffects<IBodyProps, any>(
    props =>
        props.reduce((acc, cur) => ({
            ...acc,
            ...cur
        }), {}),
    (props: IBodyProps) => {
        document.body.className = props.className || '';
        Object.assign(document.body.style, props.style || {});
    }
)(() => null);

export interface IThemeRenderProps {
    page: IPage2;
}

export type IThemeRenderer = React.FC<IThemeRenderProps>;

export interface ITheme {
    name: string;

    renderDefault: IThemeRenderer;
    render404?: IThemeRenderer;
    renderPage?: Dictionary<IThemeRenderer>;
}

export const defaultTheme: ITheme = {
    name: 'Default',

    renderDefault: ({ page }) => (
        <>
            <h2>{page.title}</h2>
            <p>{page.content}</p>
        </>
    )
};
