import { CircularProgress, Container, LinearProgress, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Body, IPageNavigation, IThemeRenderProps } from '~/core/theme';

import { Navbar } from './Navbar';

interface IPageTemplateProps {
    title: string;
    subtitle: string;
    paperStyle?: React.CSSProperties;
    navigation: IPageNavigation[];
    loading: boolean;
}

export const PageTemplate: React.FC<IPageTemplateProps> = ({
    title,
    subtitle,
    paperStyle = {},
    navigation,
    loading,
    children
}) => {
    return (
        <>
            <Body style={{ backgroundColor: '#dedede' }} />

            {loading && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
                    <LinearProgress />
                </div>
            )}

            <Navbar navigation={navigation} />

            <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, marginBottom: 30, ...paperStyle }}>
                <Container>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="overline">{subtitle}</Typography>
                </Container>
            </Paper>

            <Container style={{ height: 300 }}>
                {children}
            </Container>

            <div style={{ backgroundColor: 'black', height: 300 }}>
                <p>Footer</p>
            </div>
        </>
    );
};
