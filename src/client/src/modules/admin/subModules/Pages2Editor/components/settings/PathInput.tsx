import { InputAdornment, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPageData } from '../../actions';
import { getPages, getSavePageStatus, getSelectedPage } from '../../selectors';
import { isValidUrl } from '../../utils';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));

export const PathInput: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const saveStatus = useSelector(getSavePageStatus);

    const pathIsValid = () => isValidUrl(pages, selectedPage, selectedPage.path);

    const handlePathChange = (path: string) => {
        dispatch(setPageData({
            ...selectedPage,
            path
        }));
    };

    return (
        <TextField
            className={classes.root}
            disabled={saveStatus === 'fetching'}
            value={selectedPage.path}
            onChange={e => handlePathChange(e.target.value)}

            error={!pathIsValid()}

            InputProps={{
                startAdornment: <InputAdornment position="start">path</InputAdornment>
            }}
        />
    );
};
