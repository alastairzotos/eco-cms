import { createMuiTheme, MuiThemeProvider, Paper } from '@material-ui/core';
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
