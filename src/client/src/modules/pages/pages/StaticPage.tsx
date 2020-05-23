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

    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    const runtime = new Runtime(
        moduleManager.components,
        {
            query
        }
    );

    return <>{runtime.run(page.staging[(parseInt(query.v as string, 10) - 1) || 0])}</>;
};

export default StaticPage;
