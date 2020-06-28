import { AppBar, fade, Grid, IconButton, InputBase, LinearProgress, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer } from '~/atomic/atoms/Spacer';

import { beginGetFilesAndFolders, setCurrentPath, setFilesViewStyle } from '../actions';
import {
    getCurrentPath,
    getFilesAndFoldersFetchStatus,
    getFilesViewStyle,
    getPreviewFile
} from '../selectors';
import { getUpperPath } from '../utils';

import { FilePreview } from './FilePreview';
import { FilesListBrowser } from './FilesListBrowser';
import { FilesPathBreadcrumbs } from './FilesPathBreadcrumbs';

export const FilesBrowser: React.FC = () => {
    const dispatch = useDispatch();

    const currentPath = useSelector(getCurrentPath);
    const filesAndFoldersFetchStatus = useSelector(getFilesAndFoldersFetchStatus);
    const viewStyle = useSelector(getFilesViewStyle);
    const previewedFile = useSelector(getPreviewFile);

    React.useEffect(() => {
        dispatch(beginGetFilesAndFolders(currentPath));
    }, [currentPath]);

    const MainContent: React.FC = () => {
        return (
            <>
                <AppBar position="static" variant="outlined">
                    <Toolbar variant="dense">
                        {currentPath !== '/' && (
                            <IconButton
                                onClick={() => dispatch(setCurrentPath(getUpperPath(currentPath)))}
                            >
                                <BackIcon />
                            </IconButton>
                        )}
                        <ToggleButtonGroup
                            exclusive
                            value={viewStyle}
                            onChange={(_, newViewStyle) => dispatch(setFilesViewStyle(newViewStyle))}
                        >
                            <ToggleButton value="grid">Grid</ToggleButton>
                            <ToggleButton value="list">List</ToggleButton>
                        </ToggleButtonGroup>
                        <Spacer left={4} />
                        <FilesPathBreadcrumbs />
                    </Toolbar>
                </AppBar>
                {filesAndFoldersFetchStatus === 'fetching' && <LinearProgress />}
                {filesAndFoldersFetchStatus === 'error' && <p>There was an error</p>}
                {filesAndFoldersFetchStatus === 'success' && (
                    viewStyle === 'list'
                        ? <FilesListBrowser />
                        : <p>Todo</p>
                )}
            </>
        );
    };

    return (
        <Paper>
            {previewedFile && (
                <Grid container>
                    <Grid item xs={8}>
                        <MainContent />
                    </Grid>
                    <Grid item xs={4}>
                        <FilePreview />
                    </Grid>
                </Grid>
            )}

            {!previewedFile && (
                <MainContent />
            )}
        </Paper>
    );

};
