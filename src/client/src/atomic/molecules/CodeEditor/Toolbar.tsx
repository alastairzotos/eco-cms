import { Divider, IconButton, Toolbar } from '@material-ui/core';
import Progress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

interface IToolbarButtonProps {
    component: React.FC<any>;
    disabled: boolean;

    onClick: () => void;
}

const ToolbarButton: React.FC<IToolbarButtonProps> = ({
    component,
    disabled,
    onClick
}) => {
    const Component = component;

    return (
        <IconButton
            onClick={onClick}
            disabled={disabled}
        >
            {/* {disabled && <Progress size={24} />}
            {!disabled && <Component />} */}
            <Component />
        </IconButton>
    );
};

export interface ICodeEditorToolbarProps {
    saving: boolean;
    items: React.ReactNode[];
    handleSave: () => void;
}

const useStyles = makeStyles(theme => ({
    toolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export const CodeEditorToolbar: React.FC<ICodeEditorToolbarProps> = ({
    saving,
    handleSave,
    items
}) => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <ToolbarButton
                component={SaveIcon}
                disabled={saving}
                onClick={handleSave}
            />
            {items.map((item, index) => ({ ...(item as any), key: index }))}
        </Toolbar>
    );
};
