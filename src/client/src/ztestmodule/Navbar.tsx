import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPageNavigation } from '~/core/theme';

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
                            key={subItem.page.path}
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

export const Navbar: React.FC<{ navigation: IPageNavigation[] }> = ({ navigation }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My Website</Typography>
                {navigation.map(navItem => (
                    <NavMenuItem key={navItem.page.path} item={navItem} />
                ))}
            </Toolbar>
        </AppBar>
    );
};
