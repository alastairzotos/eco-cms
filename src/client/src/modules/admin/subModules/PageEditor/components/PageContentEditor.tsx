import { Container, Grid, makeStyles, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer } from '~/atomic/atoms/Spacer';

import { setPageData } from '../actions';
import { getSelectedPage } from '../selectors';

import { PageSettings } from './settings/PageSettings';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    }
}));

export const PageContentEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selectedPage = useSelector(getSelectedPage);

    const setTitle = (title: string) => {
        dispatch(setPageData({
            ...selectedPage,
            title
        }));
    };

    const setContent = (content: string) => {
        dispatch(setPageData({
            ...selectedPage,
            content
        }));
    };

    if (!selectedPage) {
        return <></>;
    }

    return (
        <Grid container className={classes.root}>
            <Grid item sm={9}>
                <Container maxWidth="md">
                    <Spacer top={2} />

                    <TextField
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={selectedPage.title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Spacer top={2} />

                    <TextField
                        label="Content"
                        multiline
                        fullWidth
                        rows={20}
                        variant="outlined"
                        value={selectedPage.content}
                        onChange={e => setContent(e.target.value)}
                    />
                </Container>
            </Grid>

            <Grid item sm={3}>
                <PageSettings />
            </Grid>
        </Grid>
    );
};
