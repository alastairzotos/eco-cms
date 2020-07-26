import { LinearProgress } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { pagesToTree } from '~/core';
import { IPageNavigation, IThemeRenderProps } from '~/core/theme';
import { getPages } from '~/modules/admin/subModules/PageEditor/selectors';
import { getSelectedTheme } from '~/modules/admin/subModules/SiteSettings';

import { beginGetPage } from '../actions';
import { getPage, getPageError, getPageFetchStatus } from '../selectors';

const StaticPage: React.FC<RouteComponentProps> = ({
    location
}) => {
    const dispatch = useDispatch();
    const fetchPageStatus = useSelector(getPageFetchStatus);
    const page = useSelector(getPage);
    const pages = useSelector(getPages);
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

    let Component: React.FC<IThemeRenderProps>;

    if (theme && page) {
        if (theme.renderPageType && theme.renderPageType[page.pageType]) {
            Component = theme.renderPageType[page.pageType];
        } else {
            Component = theme.renderDefault;
        }
    } else {
        Component = theme.renderDefault;
    }

    return (
        <>
            {(!fetchPageStatus || fetchPageStatus === 'fetching' || !page || !theme) && (
                <LinearProgress />
            )}

            {page && (
                <Component
                    page={page}
                    location={location}
                    navigation={pagesToTree<IPageNavigation>(
                        pages,
                        {
                            filter: navPage => navPage.navigation.selected
                        }
                    )}
                />
            )}
        </>
    );
};

export default StaticPage;
