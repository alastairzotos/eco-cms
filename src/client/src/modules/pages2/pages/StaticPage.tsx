import { LinearProgress } from '@material-ui/core';
import * as qs from 'qs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { defaultTheme, IThemeRenderProps } from '~/core/theme';
import { getSelectedTheme } from '~/modules/admin/subModules/SiteSettings';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';

const StaticPage2: React.FC<RouteComponentProps> = ({
    location
}) => {
    const dispatch = useDispatch();
    const fetchPageStatus = useSelector(getPageFetchStatus);
    const page = useSelector(getPage);
    const error = useSelector(getPageError);
    const theme = useSelector(getSelectedTheme);

    React.useEffect(() => {
        dispatch(beginGetPage(location.pathname));
    }, [location.pathname]);

    if (error) {
        if (error === 404) {
            return <p>put theme's 404 here</p>;
        }

        return <p>there was an unexpected error</p>;
    }

    if (!fetchPageStatus || fetchPageStatus === 'fetching' || !page || !theme) {
        return <LinearProgress />;
    }

    let Component: React.FC<IThemeRenderProps>;

    if (theme) {
        if (theme.renderPageType && theme.renderPageType[page.pageType]) {
            Component = theme.renderPageType[page.pageType];
        } else {
            Component = theme.renderDefault;
        }
    } else {
        Component = theme.renderDefault;
    }

    return (
        <Component
            page={page}
            location={location}
        />
    );
};

export default StaticPage2;
