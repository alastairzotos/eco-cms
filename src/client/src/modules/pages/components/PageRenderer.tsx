import { IPage } from '@common';
import { Paper, useTheme } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ParsedQs } from 'qs';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { moduleManager } from '~/core';
import { Runtime } from '~/modules/parser';

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
            <MuiThemeProvider theme={light}>
                <Paper style={{ borderRadius: 0, height: '100%' }}>
                    {children}
                </Paper>
            </MuiThemeProvider>
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