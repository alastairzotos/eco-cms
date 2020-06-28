import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { beginUploadFiles } from '../actions';
import { getUploadStatus } from '../selectors';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        border: `2px dashed ${theme.palette.divider}`
    }
}));

export const Dropzone: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const status = useSelector(getUploadStatus);

    const onDrop = React.useCallback((acceptedFiles, e) => {
        dispatch(beginUploadFiles(acceptedFiles));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <div className={classes.root} {...getRootProps()}>
            <input {...getInputProps()} />
            {status === 'fetching' && <p>Uploading...</p>}
            {status === 'success' && <p>Success</p>}
            {status === 'error' && <p>Error</p>}

            {status !== 'fetching' && (
                isDragActive
                ? <p>Drop files here</p>
                : <p>Drag files here</p>
            )}
        </div>
    );
};
