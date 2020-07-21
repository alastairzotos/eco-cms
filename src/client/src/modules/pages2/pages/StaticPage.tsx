import { LinearProgress } from '@material-ui/core';
import * as qs from 'qs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { moduleManager } from '~/core';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';

const StaticPage2: React.FC<RouteComponentProps> = ({
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

    if (!fetchPageStatus || fetchPageStatus === 'fetching' || !page) {
        return <LinearProgress />;
    }

    return moduleManager
        .moduleMap.mymodule
        .themes.find(theme => theme.name === 'My Theme')
        .renderPage[page.pageType]({
            page
        });
};

export default StaticPage2;
