import { AppBar, fade, IconButton, InputBase, LinearProgress, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer } from '~/atomic/atoms/Spacer';

import { beginGetFilesAndFolders, setCurrentPath, setFilesViewStyle } from '../actions';
import {
    getCurrentPath,
    getFilesAndFoldersFetchStatus,
    getFilesViewStyle
} from '../selectors';
import { getUpperPath } from '../utils';

import { FilesListBrowser } from './FilesListBrowser';
import { FilesPathBreadcrumbs } from './FilesPathBreadcrumbs';

export const FilesBrowser: React.FC = () => {
    const dispatch = useDispatch();

    const currentPath = useSelector(getCurrentPath);
    const filesAndFoldersFetchStatus = useSelector(getFilesAndFoldersFetchStatus);
    const viewStyle = useSelector(getFilesViewStyle);

    React.useEffect(() => {
        dispatch(beginGetFilesAndFolders(currentPath));
    }, [currentPath]);

    return (
        <Paper>
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
            <>
                {filesAndFoldersFetchStatus === 'fetching' && <LinearProgress />}
                {filesAndFoldersFetchStatus === 'error' && <p>There was an error</p>}
                {filesAndFoldersFetchStatus === 'success' && (
                    viewStyle === 'list'
                        ? <FilesListBrowser />
                        : <p>Todo</p>
                )}
            </>
        </Paper>
    );

};
