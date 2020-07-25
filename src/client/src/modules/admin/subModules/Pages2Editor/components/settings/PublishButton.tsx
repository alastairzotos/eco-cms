import { Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { beginSavePage } from '../../actions';
import { getSavePageStatus, getSelectedPage, isDirty } from '../../selectors';

export const PublishButton: React.FC = () => {
    const dispatch = useDispatch();

    const selectedPage = useSelector(getSelectedPage);
    const dirty = useSelector(isDirty);
    const saveStatus = useSelector(getSavePageStatus);

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={!dirty || saveStatus === 'fetching'}

            onClick={() => dispatch(beginSavePage(selectedPage))}
        >
        {
            saveStatus === 'fetching'
            ? <CircularProgress size={20} />
            : (
                dirty
                ? <span>Publish *</span>
                : <span>Publish</span>
            )
        }
        </Button>
    );
};
