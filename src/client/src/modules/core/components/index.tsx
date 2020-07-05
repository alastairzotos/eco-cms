import {
    createMuiTheme,
    Grid,
    MuiThemeProvider,
    Paper
} from '@material-ui/core';
import * as Mui from '@material-ui/core'; //tslint:disable-line
import * as React from 'react';

const theme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

export const Page: React.FC = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Paper square style={{ height: '100%' }}>
                {children}
            </Paper>
        </MuiThemeProvider>
    );
};

export const Row: React.FC = ({ children }) => {
    return <Grid container>{children}</Grid>;
};

type OneToTwelve = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColumnProps {
    span: OneToTwelve;
}

export const Column: React.FC<ColumnProps> = ({
    span,
    children
}) => {
    return <Grid item xs={span}>{children}</Grid>;
};

export interface TypographyProps {
    variant: 'button' | 'caption'
        | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        | 'inherit'
        | 'subtitle1' | 'subtitle2'
        | 'body1' | 'body2' | 'overline' | 'srOnly';

    content: string;
}

export const Typography: React.FC<TypographyProps> = ({ variant, content }) =>
    <Mui.Typography variant={variant}>{content}</Mui.Typography>;
