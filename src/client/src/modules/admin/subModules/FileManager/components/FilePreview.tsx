import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '~/core';

import { previewFile } from '../actions';
import { getPreviewFile } from '../selectors';
import { getBaseName } from '../utils';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    }
}));

export const FilePreview: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const previewedFile = useSelector(getPreviewFile);

    if (!previewedFile) {
        return <></>;
    }

    return (
        <>
            <AppBar position="static" variant="outlined">
                <Toolbar className={classes.toolbar}>
                    <Typography>{getBaseName(previewedFile.filename)}</Typography>
                    <IconButton
                        onClick={() => dispatch(previewFile(null))}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <>
            <Typography>Path: {`/static${previewedFile.filename}`}</Typography>
                <div>
                    {previewedFile.contentType.startsWith('image/') && (
                        <img
                            className={classes.image}
                            src={`${config.domain}/api/static${previewedFile.filename}`}
                        />
                    )}
                </div>
            </>
        </>
    );
};
