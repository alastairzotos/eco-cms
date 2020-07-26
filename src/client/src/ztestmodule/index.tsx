import { AppBar, Button, Container, Menu, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/Adjust';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import NestedMenuItem from 'material-ui-nested-menu-item';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { fetch$, IModule } from '../core';
import { Body, IPageNavigation, IThemeRenderProps } from '../core/theme';

interface ITestState {
    darkMode: boolean;
}

const getState = (state: any): ITestState => state.mymodule;

const isDarkMode = createSelector(
    getState,
    state => state.darkMode
);

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
    navigation,
    children
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
    reducer: createReducer<ITestState>({ darkMode: false }, {
        set_mode: (state, action) => ({
            ...state,
            darkMode: action.payload
        })
    }),
    epic: action$ => action$.ofType('inc_count').pipe(
        switchMap(action =>
            fetch$({
                method: 'GET',
                url: '/test'
            }).pipe(
                switchMap(res => {
                    console.log(res);
                    return of({ type: 'nothing' });
                })
            )
        )
    ),
    adminPages: [
        {
            title: 'My App',
            path: '/myapp',
            icon: Icon,
            component: () => {
                const dispatch = useDispatch();
                const darkMode = useSelector(isDarkMode);

                return (
                    <>
                        <button
                            onClick={() => dispatch({ type: 'set_mode', payload: !darkMode })}
                        >
                            {darkMode ? 'Light mode' : 'Dark mode'}
                        </button>
                    </>
                );
            }
        }
    ],

    pages: {
        '/get-in-touch': () =>
            <p>Get in touch</p>
    },

    themes: [
        {
            name: 'My Theme',

            renderDefault: PageTemplate,
        },
        {
            name: 'My Theme 2',
            renderDefault: PageTemplate,

            renderPageType: {
                home: PageTemplate,
                contact: PageTemplate
            }
        }
    ]
};
