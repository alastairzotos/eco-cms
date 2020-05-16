import { CircularProgress, Divider, Fab, LinearProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '~/atomic/atoms/Panel';
import { beginAddPage, beginGetPages } from '~/modules/admin/actions';
import { getAddPageStatus, getGetPagesStatus, getPages } from '~/modules/admin/selectors/pages';

const useStyles = makeStyles(theme => ({
    main: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    view: {
        justifyContent: 'normal'
    },
    addBtn: {
        // alignSelf: 'flex-end'
    }
}));

export const PagesSidePanel: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const addPageStatus = useSelector(getAddPageStatus);
    const getPagesStatus = useSelector(getGetPagesStatus);

    React.useEffect(() => {
        dispatch(beginGetPages());
    }, []);

    const onClickNew = () => {
        dispatch(beginAddPage({
            path: `/page-${pages.length + 1}`,
            title: 'New page',
            content: '<p>New page</p>'
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
                    <p>{JSON.stringify(pages)}</p>
                </div>

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
