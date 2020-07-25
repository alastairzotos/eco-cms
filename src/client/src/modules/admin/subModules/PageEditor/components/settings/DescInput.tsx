import { makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPageData } from '../../actions';
import { getSelectedPage } from '../../selectors';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));

export const DescInput: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selectedPage = useSelector(getSelectedPage);

    const handleDescChange = (description: string) => {
        dispatch(setPageData({
            ...selectedPage,
            description
        }));
    };

    return (
        <TextField
            className={classes.root}
            variant="filled"
            label="Description"
            multiline
            rows={3}

            value={selectedPage.description}
            onChange={e => handleDescChange(e.target.value)}
        />
    );
};
