import { IPage } from '@common';
import { Paper, useTheme } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ParsedQs } from 'qs';
import * as React from 'react';
import { moduleManager } from '~/core';
import { Runtime } from '~/modules/parser';

export const light = createMuiTheme({
    palette: {
        type: 'light'
    }
});

export interface IPageRendererProps {
    page: IPage;
    query: ParsedQs;
    deployment: 'staging' | 'production';
    version: number;
}

const PageContainer: React.FC = ({ children }) => {
    return (
        <MuiThemeProvider theme={light}>
            <Paper style={{ borderRadius: 0, height: '100%' }}>
                {children}
            </Paper>
        </MuiThemeProvider>
    );
};

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
            theme
        }
    );

    if (deployment === 'staging') {
        return <PageContainer>{runtime.run(page.staging[version])}</PageContainer>;
    }

    return <PageContainer>{runtime.run(page.production[version])}</PageContainer>;
};
