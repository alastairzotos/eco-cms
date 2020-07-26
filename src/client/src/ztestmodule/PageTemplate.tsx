import {  Container, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Body, IPageNavigation, IThemeRenderProps } from '~/core/theme';

import { Navbar } from './Navbar';

interface IPageTemplateProps {
    title: string;
    subtitle: string;
    paperStyle?: React.CSSProperties;
    navigation: IPageNavigation[];
}

export const PageTemplate: React.FC<IPageTemplateProps> = ({
    title,
    subtitle,
    paperStyle = {},
    navigation,
    children
}) => {
    return (
        <>
            <Body style={{ backgroundColor: '#dedede' }} />

            <Navbar navigation={navigation} />

            <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, margin: 30, ...paperStyle }}>
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
