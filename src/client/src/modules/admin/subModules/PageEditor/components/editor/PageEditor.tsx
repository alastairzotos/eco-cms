import {
    Backdrop,
    Button,
    CircularProgress,
    DialogContentText,
    FormControlLabel,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Confirm } from '~/atomic/molecules/Confirm';
import { PageEditorToolbar } from '~/atomic/molecules/PageEditorToolbar';

import { beginDeletePage, beginSavePage, setPageData } from '../../actions';
import {
    getDeletePageStatus,
    getPages,
    getSavePageStatus,
    getSelectedPage,
    isDirty
} from '../../selectors';
import { isValidUrl } from '../../utils';
import { VariationSelector } from '../VariationSelector';

import { ComponentEditor } from './ComponentEditor';
import { GridEditor } from './GridEditor';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: '100%'
    },
    descTextField: {
        width: 500
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

export const PageEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const saveStatus = useSelector(getSavePageStatus);
    const dirty = useSelector(isDirty);
    const deleteStatus = useSelector(getDeletePageStatus);

    const [savePromptOpen, setSavePromptOpen] = React.useState(false);
    const [publishPromptOpen, setPublishPromptOpen] = React.useState(false);
    const [descPromptOpen, setDescPromptOpen] = React.useState(false);
    const [deletePromptOpen, setDeletePromptOpen] = React.useState(false);

    if (!selectedPage) {
        return <></>;
    }

    const handleSave = (publish: boolean) => {
        if (publish) {
            dispatch(beginSavePage({
                ...selectedPage,
                production: [...selectedPage.staging]
            }));
        } else {
            dispatch(beginSavePage(selectedPage));
        }
    };

    const handlePathChange = (path: string) => {
        dispatch(setPageData({
            ...selectedPage,
            path
        }));
    };

    const handleTitleChange = (title: string) => {
        dispatch(setPageData({
            ...selectedPage,
            title
        }));
    };

    const handleDescriptionChange = (description: string) => {
        dispatch(setPageData({
            ...selectedPage,
            description
        }));
    };

    const handlePublishClick = () => {
        if (dirty) {
            setSavePromptOpen(true);
        } else {
            setPublishPromptOpen(true);
        }
    };

    const pathIsValid = () => isValidUrl(pages, selectedPage, selectedPage.path);

    return (
        <>
            <PageEditorToolbar
                dirty={dirty}
                saving={saveStatus === 'fetching'}
                handleSave={() => handleSave(false)}
                items={[
                    <TextField
                        disabled={saveStatus === 'fetching'}
                        value={selectedPage.path}
                        onChange={e => handlePathChange(e.target.value)}

                        error={!pathIsValid()}

                        InputProps={{
                            startAdornment: <InputAdornment position="start">path</InputAdornment>
                        }}
                    />,

                    <TextField
                        disabled={saveStatus === 'fetching'}
                        value={selectedPage.title}
                        onChange={e => handleTitleChange(e.target.value)}

                        InputProps={{
                            startAdornment: <InputAdornment position="start">title</InputAdornment>
                        }}
                    />,

                    <FormControlLabel
                        label="Desc"
                        control={
                            <IconButton
                                size="small"
                                disabled={saveStatus === 'fetching'}
                                onClick={() => setDescPromptOpen(true)}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        }
                    />,

                    <VariationSelector page={selectedPage} />,

                    <Button
                        size="small"
                        variant="contained"
                        onClick={handlePublishClick}
                        disabled={saveStatus === 'fetching'}
                    >
                        Publish
                    </Button>,

                    <IconButton
                        disabled={saveStatus === 'fetching'}
                        onClick={() => setDeletePromptOpen(true)}
                    >
                        <Delete />
                    </IconButton>
                ]}
            />

            <div className={classes.root}>
                <GridEditor />
            </div>

            <ComponentEditor />

            <Confirm
                title="Save before publishing"
                open={savePromptOpen}
                onCancel={() => setSavePromptOpen(false)}
                onConfirm={() => {
                    setSavePromptOpen(false);
                    setPublishPromptOpen(true);
                }}
                confirmPrompt="Save"
            >
                <DialogContentText>You have unsaved changes. Please save before publishing.</DialogContentText>
            </Confirm>

            <Confirm
                title="Publish"
                open={publishPromptOpen}
                onCancel={() => setPublishPromptOpen(false)}
                onConfirm={() => {
                    setPublishPromptOpen(false);
                    handleSave(true);
                }}
                confirmPrompt="Publish"
            >
                <DialogContentText>Are you sure you want to publish?</DialogContentText>
            </Confirm>

            <Confirm
                title="Description"
                open={descPromptOpen}
                onCancel={() => setDescPromptOpen(false)}
                onConfirm={() => setDescPromptOpen(false)}
            >
                <TextField
                    className={classes.descTextField}
                    multiline
                    value={selectedPage.description}
                    onChange={e => handleDescriptionChange(e.target.value)}
                />
            </Confirm>

            <Confirm
                title="Delete page"
                open={deletePromptOpen}
                onCancel={() => setDeletePromptOpen(false)}
                onConfirm={() => {
                    setDeletePromptOpen(false);
                    dispatch(beginDeletePage(selectedPage));
                }}
                confirmPrompt="Delete"
            >
                <DialogContentText>Are you sure you want to delete the page?</DialogContentText>
            </Confirm>

            <Backdrop
                className={classes.backdrop}
                open={deleteStatus === 'fetching'}
            >
                <CircularProgress />
            </Backdrop>
        </>
    );
};
