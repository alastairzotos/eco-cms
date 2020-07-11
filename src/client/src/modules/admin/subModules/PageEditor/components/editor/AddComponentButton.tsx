import { IPageColumn } from '@common';
import { Fab, Fade, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Plus from '@material-ui/icons/Add';
import cx from 'clsx';
import NestedMenuItem from 'material-ui-nested-menu-item';
import * as React from 'react';
import { moduleManager } from '~/core';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: 'auto',
        marginTop: -20
    },
    rootEmpty: {
        marginTop: 20
    }
}));

export interface IAddComponentButtonProps {
    column: IPageColumn;
    onAddComponent: (type: [string, string]) => void;
}

export const AddComponentButton: React.FC<IAddComponentButtonProps> = ({
    column,
    onAddComponent
}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const components = moduleManager.getModuleComponents();

    return (
        <>
            <Fab
                className={cx(classes.root, {
                    [classes.rootEmpty]: column.children.length === 0
                })}
                size="small"
                onClick={handleClick}
            >
                <Plus />
            </Fab>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
            {
                Object.keys(components).map(moduleName => (
                    <NestedMenuItem
                        key={moduleName}
                        label={moduleName}
                        parentMenuOpen={open}
                    >
                    {
                        Object.keys(components[moduleName]).map(compName => (
                            <MenuItem
                                key={`${moduleName}-${compName}`}
                                onClick={() => {
                                    onAddComponent([moduleName, compName]);
                                    handleClose();
                                }}
                            >
                                {compName}
                            </MenuItem>
                        ))
                    }
                    </NestedMenuItem>
                ))
            }
            </Menu>
        </>
    );
};
