import { IconButton, makeStyles, Paper } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer } from '~/atomic/atoms/Spacer';
import { Confirm } from '~/atomic/molecules/Confirm';

import { beginDeletePage } from '../../actions';
import { getSelectedPage } from '../../selectors';

import { DescInput } from './DescInput';
import { PageTypeSelect } from './PageTypeSelect';
import { PathInput } from './PathInput';
import { PublishButton } from './PublishButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    spacer: {
        flexGrow: 1
    },
    deleteContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export const PageSettings: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectedPage = useSelector(getSelectedPage);

    const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

    const handleDeleteConfirm = () => {
        dispatch(beginDeletePage(selectedPage));

        setDeleteConfirmOpen(false);
    };

    return (
        <>
            <Paper className={classes.root} elevation={2}>
                <PublishButton />
                <Spacer top={2} />
                <PathInput />
                <Spacer top={2} />
                <DescInput />
                <Spacer top={2} />
                <PageTypeSelect />
                <div className={classes.spacer} />
                <div className={classes.deleteContainer}>
                    {selectedPage && (
                        <IconButton
                            onClick={() => setDeleteConfirmOpen(true)}
                        >
                            <Delete />
                        </IconButton>
                    )}
                </div>
            </Paper>
            <Confirm
                open={deleteConfirmOpen}
                title="Are you sure you want to delete this page?"
                confirmPrompt="Delete"
                onCancel={() => setDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};
