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
            return <Redirect to="/not-found" />;
        }

        return <p>there was an unexpected error</p>;
    }

    if (!fetchPageStatus || fetchPageStatus === 'fetching' || !page || !theme) {
        return <LinearProgress />;
    }

    const themeProps: IThemeRenderProps = {
        page
    };

    if (theme) {
        if (theme.renderPage && theme.renderPage[page.pageType]) {
            return theme.renderPage[page.pageType](themeProps);
        } else {
            return theme.renderDefault(themeProps);
        }
    }

    return defaultTheme.renderDefault(themeProps);
};

export default StaticPage2;
