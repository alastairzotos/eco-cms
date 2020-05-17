import { LinearProgress } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ReactRenderer } from '~/modules/parser';
import * as staticComponents from '~/staticComponents';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';

const renderer = new ReactRenderer(staticComponents as any);

const StaticPage: React.FC<RouteComponentProps> = ({
    location
}) => {
    const dispatch = useDispatch();
    const fetchStatus = useSelector(getPageFetchStatus);
    const page = useSelector(getPage);
    const error = useSelector(getPageError);

    React.useEffect(() => {
        dispatch(beginGetPage(location.pathname));
    }, [location.pathname]);

    if (error) {
        if (error === 404) {
            return <p>this is the 404 page</p>;
        }

        return <p>there was an unexpected error</p>;
    }

    if (fetchStatus === 'fetching' || !page) {
        return <LinearProgress />;
    }

    return renderer.render(page.content);
};

export default StaticPage;
