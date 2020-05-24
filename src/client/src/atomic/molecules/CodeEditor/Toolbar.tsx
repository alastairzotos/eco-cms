import { CircularProgress, Divider, IconButton, Toolbar } from '@material-ui/core';
import Progress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

interface IToolbarButtonProps {
    highlight?: boolean;
    component: React.FC<any>;
    disabled: boolean;

    onClick: () => void;
}

const ToolbarButton: React.FC<IToolbarButtonProps> = ({
    highlight = false,
    component,
    disabled,
    onClick
}) => {
    const Component = component;

    return (
        <IconButton
            color={highlight ? 'secondary' : 'default'}
            onClick={onClick}
            disabled={disabled}
        >
            {/* {disabled && <Progress size={24} />}
            {!disabled && <Component />} */}
            <Component />
        </IconButton>
    );
};

export interface ICodeEditorToolbarItemProps {
    disabled: boolean;
}

export interface ICodeEditorToolbarProps {
    dirty: boolean;
    saving: boolean;
    items: Array<React.FC<ICodeEditorToolbarItemProps>>;
    handleSave: () => void;
}

const useStyles = makeStyles(theme => ({
    toolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between'
    },
    toolbarItemContainer: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        paddingLeft: theme.spacing(2)
    }
}));

export const CodeEditorToolbar: React.FC<ICodeEditorToolbarProps> = ({
    dirty,
    saving,
    handleSave,
    items
}) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            {
                saving
                ? <CircularProgress size={24} />
                : (
                    <ToolbarButton
                        highlight={dirty}
                        component={SaveIcon}
                        disabled={saving}
                        onClick={handleSave}
                    />
                )
            }
            {/* {
                items.map((item, index) => (
                    <div className={classes.toolbarItemContainer} key={index}>
                        { ...(item as any) }
                    </div>
                ))
            } */}
            {
                items.map((Item, index) => (
                    <div className={classes.toolbarItemContainer} key={index}>
                        <Item disabled={saving} />
                    </div>
                ))
            }
        </Toolbar>
    );
};
