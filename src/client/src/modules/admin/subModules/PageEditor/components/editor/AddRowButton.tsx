import { ColumnSpan } from '@common';
import { Fab, Fade, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Plus from '@material-ui/icons/Add';
import * as React from 'react';

export interface IAddRowButtonProps {
    onAddRow: (spans: ColumnSpan[]) => void;
}

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: 'auto',
        marginTop: 20
    }
}));

const rowTypes: ColumnSpan[][] = [
    [12],
    [6, 6],
    [4, 4, 4],
    [3, 3, 3, 3]
];

const getRowTypeMenuItemText = (spans: ColumnSpan[]) =>
    spans.length === 1
    ? '1 column'
    : `${spans.length} columns`;

export const AddRowButton: React.FC<IAddRowButtonProps> = ({ onAddRow }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Fab
                size="small"
                color="primary"
                variant="extended"
                className={classes.root}
                onClick={handleClick}
            >
                Add row <Plus fontSize={'small'} />
            </Fab>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
            {
                rowTypes.map((rowType, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleClose();
                            onAddRow(rowType);
                        }}
                    >
                        {getRowTypeMenuItemText(rowType)}
                    </MenuItem>
                ))
            }
            </Menu>
        </>
    );
};
