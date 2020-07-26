import { AppBar, Button, Container, Menu, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/Adjust';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import NestedMenuItem from 'material-ui-nested-menu-item';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { IModule } from '../core';
import { Body, IPageNavigation, IThemeRenderProps } from '../core/theme';

const NavMenuDropdownItem: React.FC<{ item: IPageNavigation }> = ({ item }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    return (
        <>
            <Button
                onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}
            >
                {item.page.title}
            </Button>
            <Menu
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >
            {
                item.children.map(subItem => (
                    subItem.children.length > 0
                    ? (
                        null
                    )
                    : (
                        <MenuItem
                            key={subItem.page._id}
                            component={Link}
                            to={subItem.page.path}
                        >
                            {subItem.page.title}
                        </MenuItem>
                    )
                ))
            }
            </Menu>
        </>
    );
};

const NavMenuItem: React.FC<{ item: IPageNavigation }> = ({ item }) => {
    if (item.children.length === 0) {
        return <Button component={Link} to={item.page.path}>{item.page.title}</Button>;
    }

    return <NavMenuDropdownItem item={item} />;
};

const PageTemplate: React.FC<IThemeRenderProps> = ({
    page,
    navigation
}) => {
    return (
        <>
            <Body style={{ backgroundColor: '#dedede' }} />

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">My Website</Typography>
                    {navigation.map(navItem => (
                        <NavMenuItem key={navItem.page._id} item={navItem} />
                    ))}
                </Toolbar>
            </AppBar>

            <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, margin: 30 }}>
                <Container>
                    <Typography variant="h3">{page.title}</Typography>
                    <Typography variant="overline">{page.description}</Typography>
                </Container>
            </Paper>

            <Container style={{ height: 300 }}>
                <Typography>{page.content}</Typography>
            </Container>

            <div style={{ backgroundColor: 'black', height: 300 }}>
                <p>Footer</p>
            </div>
        </>
    );
};

export const myModule: IModule = {
    name: 'mymodule',
    themes: [
        {
            name: 'My Theme 2',
            renderDefault: PageTemplate,

            renderPageType: {
                home: PageTemplate,
                contact: PageTemplate
            },

            render404:props => (
                <PageTemplate
                    {...props}
                    page={{
                        title: 'Not found',
                        content: 'This page cannot be found',
                        description: '404 - Page not found',
                        navigation: null,
                        pageType: '404',
                        path: '',
                        published: true
                    }}
                />
            )
        }
    ]
};
