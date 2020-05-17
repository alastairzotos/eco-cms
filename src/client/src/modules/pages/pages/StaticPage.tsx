import { LinearProgress } from '@material-ui/core';
import * as qs from 'qs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { moduleManager } from '~/core';
import { Runtime } from '~/modules/parser';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';

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
            return <p>this is the 404 page</p>;
        }

        return <p>there was an unexpected error</p>;
    }

    if (fetchPageStatus === 'fetching' || !page) {
        return <LinearProgress />;
    }

    const runtime = new Runtime(
        moduleManager.components,
        {
            query: qs.parse(location.search, { ignoreQueryPrefix: true })
        }
    );

    return <>{runtime.run(page.content)}</>;
};

export default StaticPage;
