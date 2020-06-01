import { IPage } from '@common';
import { useTheme } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ParsedQs } from 'qs';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { moduleManager } from '~/core';
import { Runtime } from '~/modules/parser';

import { ErrorBoundary } from './ErrorBoundary';

export const light = createMuiTheme({
    palette: {
        type: 'light'
    }
});

interface IPageContainerProps {
    page: IPage;
}

const PageContainer: React.FC<IPageContainerProps> = ({
    page,
    children
}) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{page.title}</title>
                <meta name="description" content={page.description} />
            </Helmet>
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </>
    );
};

export interface IPageRendererProps {
    page: IPage;
    query: ParsedQs;
    deployment: 'staging' | 'production';
    version: number;
}

export const PageRenderer: React.FC<IPageRendererProps> = ({
    page,
    query,
    deployment,
    version,
}) => {
    const theme = useTheme();

    const runtime = new Runtime(
        moduleManager.components,
        {
            query,
            window,
            console,
            Object,
            JSON,
            Math,
            theme
        }
    );

    if (deployment === 'staging') {
        return <PageContainer page={page}>{runtime.run(page.staging[version])}</PageContainer>;
    }

    return <PageContainer page={page}>{runtime.run(page.production[version])}</PageContainer>;
};
