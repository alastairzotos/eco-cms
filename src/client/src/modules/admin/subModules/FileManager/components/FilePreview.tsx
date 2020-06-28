import { AppBar, IconButton, InputAdornment, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '~/core';

import { beginUpdateFile, previewFile } from '../actions';
import { getFileUpdateStatus, getPreviewFile } from '../selectors';
import { getBaseName, getFilePath, validateFilename } from '../utils';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
    main: {
        margin: theme.spacing(1)
    }
}));

export const FilePreview: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const previewedFile = useSelector(getPreviewFile);
    const updateStatus = useSelector(getFileUpdateStatus);

    const [basename, setBasename] = React.useState(previewedFile ? getBaseName(previewedFile.filename) : '');

    React.useEffect(() => {
        if (basename !== getBaseName(previewedFile.filename)) {
            setBasename(getBaseName(previewedFile.filename));
        }
    }, [previewedFile._id]);

    if (!previewedFile) {
        return <></>;
    }

    const handleBasenameChange = (newBaseName: string) => {
        setBasename(newBaseName);
    };

    const handleUpdateFilename = () => {
        if (validateFilename(basename)) {
            dispatch(beginUpdateFile({
                ...previewedFile,
                filename: getFilePath(previewedFile.filename) + '/' + basename
            }));
        }
    };

    return (
        <>
            <AppBar position="static" variant="outlined">
                <Toolbar className={classes.toolbar}>
                    <Typography>Preview</Typography>
                    <IconButton
                        onClick={() => dispatch(previewFile(null))}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.main}>
                <TextField
                    disabled={updateStatus === 'fetching'}
                    value={basename}
                    onChange={e => handleBasenameChange(e.target.value)}
                    onBlur={handleUpdateFilename}
                    error={!validateFilename(basename) || updateStatus === 'error'}
                    helperText={
                        !validateFilename(basename)
                        ? 'Invalid file name'
                        : (
                            updateStatus === 'error'
                            ? 'Update error'
                            : ''
                        )
                    }

                    InputProps={{
                        startAdornment: <InputAdornment position="start">Filename</InputAdornment>
                    }}
                />
                <Typography>Path: {`/static${previewedFile.filename}`}</Typography>
                <div>
                    {previewedFile.contentType.startsWith('image/') && (
                        <img
                            className={classes.image}
                            src={`${config.domain}/api/static${previewedFile.filename}`}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
