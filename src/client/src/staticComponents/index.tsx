import { createMuiTheme, MuiThemeProvider, Paper } from '@material-ui/core';
import * as React from 'react';

export const MyComponent: React.FC<{ test: string }> = ({ test, children }) => {
    return (
        <div style={{ border: '1px solid green' }}>
            <h4>My Component</h4>
            <p>Test: {test}</p>

            {children}
        </div>
    );
};

export const MyComponent2: React.FC<any> = ({ children }) => {
    return (
        <div style={{ border: '1px solid blue' }}>
            <h4>My Component 2</h4>
            {children}
        </div>
    );
};

const theme = createMuiTheme({
    palette: {
        type: 'dark'
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

export * from '@material-ui/core';
