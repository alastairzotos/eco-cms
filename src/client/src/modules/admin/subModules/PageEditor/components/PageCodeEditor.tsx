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
import { CodeEditor } from '~/atomic/molecules/CodeEditor';
import { Confirm } from '~/atomic/molecules/Confirm';
import { getTheme } from '~/modules/admin/subModules/AdminCore';

import { beginDeletePage, beginSavePage, setPageData } from '../actions';
import { IPageInfo } from '../models';
import {
    getDeletePageStatus,
    getPages,
    getSavePageStatus,
    getSelectedPage,
    getSelectedVariation,
    isDirty
} from '../selectors';
import { isValidUrl } from '../utils';

import { PagePreview } from './PagePreview';
import { VariationSelector } from './VariationSelector';

const useStyles = makeStyles(theme => ({
    descTextField: {
        width: 500
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}));

export const PageCodeEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getTheme);
    const saveStatus = useSelector(getSavePageStatus);
    const variation = useSelector(getSelectedVariation);
    const dirty = useSelector(isDirty);
    const deleteStatus = useSelector(getDeletePageStatus);

    const pageRef = React.useRef<IPageInfo>(null);
    const [previewing, setPreviewing] = React.useState(false);
    const [savePromptOpen, setSavePromptOpen] = React.useState(false);
    const [publishPromptOpen, setPublishPromptOpen] = React.useState(false);
    const [descPromptOpen, setDescPromptOpen] = React.useState(false);
    const [deletePromptOpen, setDeletePromptOpen] = React.useState(false);

    if (!selectedPage) {
        return <></>;
    }

    pageRef.current = selectedPage;

    const pathIsValid = () => isValidUrl(pages, selectedPage, selectedPage.path);

    const handleScroll = (scroll: number) => {
        dispatch(setPageData({
            ...pageRef.current,
            scroll
        }));
    };

    const handleSave = (publish: boolean) => {
        if (publish) {
            dispatch(beginSavePage({
                ...pageRef.current,
                production: [...pageRef.current.staging]
            }));
        } else {
            dispatch(beginSavePage(pageRef.current));
        }
    };

    const handleChange = (value: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            staging: pageRef.current.staging
                .map((current, index) =>
                    index === variation
                    ? value
                    : current
                )
        }));
    };

    const handlePathChange = (path: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            path
        }));
    };

    const handleTitleChange = (title: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            title
        }));
    };

    const handleDescriptionChange = (description: string) => {
        dispatch(setPageData({
            ...pageRef.current,
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

    return (
        <>
            <CodeEditor
                id={selectedPage._id}
                theme={theme}
                content={selectedPage.staging[variation]}
                scroll={pageRef.current.scroll}
                dirty={dirty}
                saving={saveStatus === 'fetching'}

                handleScroll={handleScroll}
                handleSave={() => handleSave(false)}
                handleChange={handleChange}

                toolbar={[
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

                    <VariationSelector page={pageRef.current} />,

                    <Button
                        disabled={saveStatus === 'fetching'}
                        size="small"
                        onClick={() => setPreviewing(true)}
                    >
                        Preview
                    </Button>,

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

            <PagePreview
                page={pageRef.current}
                open={previewing}
                onClose={() => setPreviewing(false)}
            />

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
                    value={pageRef.current.description}
                    onChange={e => handleDescriptionChange(e.target.value)}
                />
            </Confirm>

            <Confirm
                title="Delete page"
                open={deletePromptOpen}
                onCancel={() => setDeletePromptOpen(false)}
                onConfirm={() => {
                    setDeletePromptOpen(false);
                    dispatch(beginDeletePage(pageRef.current));
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
