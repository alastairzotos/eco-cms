import {
    AppBar,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import ThemeDark from '@material-ui/icons/Brightness2';
import ThemeLight from '@material-ui/icons/BrightnessHigh';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import * as React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';

import { useStyles } from './styles';

export type IAdminTheme = 'light' | 'dark';

export interface IAdminPage {
    title: string;
    path: string;
    component: React.FC<any>;
    icon: React.FC<any>;
}

export interface IAdminLayoutProps {
    pages: IAdminPage[];

    currentTheme: IAdminTheme;
    onToggleTheme: () => void;

    loading?: boolean;
}

export const AdminLayout: React.FC<IAdminLayoutProps> = ({
    pages,

    currentTheme,
    onToggleTheme,

    loading = false
}) => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [open, setOpen] = React.useState(false);

    const currentPage = pages.find(page => page.path === pathname);

    const CurrentComponent = currentPage ? currentPage.component : null;

    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {
                            currentPage
                                ? currentPage.title
                                : 'Not found'
                        }
                    </Typography>

                    <Button
                        onClick={() => {
                            onToggleTheme();
                        }}
                    >
                        {
                            currentTheme === 'light'
                                ? <ThemeDark />
                                : <ThemeLight />
                        }
                    </Button>
                </Toolbar>

                <Divider />
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.titleBar}>
                    <IconButton onClick={() => setOpen(false)} style={{ justifySelf: 'flex-end' }}>
                        <ChevronLeftIcon fontSize={'small'} />
                    </IconButton>
                </div>

                <Divider />

                <List>
                    {
                        pages.map(page => {
                            const Icon = page.icon;

                            return (
                                <Link
                                    key={page.path}
                                    to={page.path}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <ListItem
                                        button
                                        selected={currentPage && page.path === currentPage.path}
                                    >
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={page.title} />
                                    </ListItem>
                                </Link>
                            );
                        })
                    }
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {loading && <LinearProgress color="secondary" />}

                <div className={classes.innerContent}>
                    {
                        currentPage
                            ? <CurrentComponent />
                            : <p>Page not found</p>
                    }
                </div>
            </main>

            <AppBar className={classes.bottomAppbar}></AppBar>

            <Switch>
                {
                    pages.map(page => (
                        <Route
                            key={page.path}
                            path={page.path}
                            exact
                        />
                    ))
                }
            </Switch>
        </div>
    );
};