import { CircularProgress, Divider, Fab, LinearProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '~/atomic/atoms/Panel';

import { beginAddPage, beginGetPages } from '../actions';
import { getAddPageStatus, getGetPagesStatus, getPages } from '../selectors';

import { PagesView } from './PagesView';

const useStyles = makeStyles(theme => ({
    main: {
        padding: theme.spacing(1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    view: {
        marginBottom: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1,
    },
    addBtn: {
        marginTop: theme.spacing(1)
    }
}));

export const PagesSidePanel: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const addPageStatus = useSelector(getAddPageStatus);
    const getPagesStatus = useSelector(getGetPagesStatus);

    const onClickNew = () => {
        dispatch(beginAddPage({
            path: `/page-${pages.length + 1}`,
            title: 'New page',
            description: 'This is a page',
            content: '',
            pageType: 'standard',
            published: false,
            navigation: {
                parentPage: null,
                selected: true
            }
        }));
    };

    return (
        <Panel border="right">
            <div className={classes.main}>
                {getPagesStatus === 'fetching' && <LinearProgress />}
                {getPagesStatus === 'error' && (
                    <p>There was an error getting the pages</p>
                )}

                <div className={classes.view}>
                    <PagesView />
                </div>

                <Divider />

                <div className={classes.spacer} />

                <Fab
                    className={classes.addBtn}
                    variant="extended"
                    color="primary"
                    size="small"

                    disabled={addPageStatus === 'fetching'}

                    onClick={onClickNew}
                >
                    {addPageStatus === 'fetching' && <CircularProgress size={20} />}
                    New page
                </Fab>
            </div>
        </Panel>
    );
};
