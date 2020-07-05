import { LinearProgress } from '@material-ui/core';
import * as qs from 'qs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';
import { renderPage } from '../utils';

const StaticPage: React.FC<RouteComponentProps> = ({
    location
}) => {
    const dispatch = useDispatch();
    const fetchPageStatus = useSelector(getPageFetchStatus);
    const page = useSelector(getPage);
    const error = useSelector(getPageError);

    React.useEffect(() => {
        dispatch(beginGetPage(location.pathname));
    }, [location.pathname]);

    if (error) {
        if (error === 404) {
            return <Redirect to="/not-found" />;
        }

        return <p>there was an unexpected error</p>;
    }

    if (fetchPageStatus === 'fetching' || !page) {
        return <LinearProgress />;
    }

    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const variation = (parseInt(query.v as string, 10) - 1) || 0;

    return <>{renderPage(page.production[variation])}</>;
};

export default StaticPage;
