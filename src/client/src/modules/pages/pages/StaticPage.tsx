import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { pagesToTree } from '~/core';
import { defaultTheme, IPageNavigation, IThemeRenderProps } from '~/core/theme';
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

    const navigation = pagesToTree<IPageNavigation>(
        pages,
        {
            filter: navPage => navPage.navigation.selected
        }
    );

    if (error) {
        if (error === 404) {
            if (theme && theme.render404) {
                return theme.render404({ page: null, location, navigation, loading: false });
            } else {
                return defaultTheme.render404({ page: null, location, navigation, loading: false });
            }
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
        Component = defaultTheme.renderDefault;
    }

    return (
        <>
            {page && (
                <Component
                    page={page}
                    location={location}
                    navigation={navigation}
                    loading={!fetchPageStatus || fetchPageStatus === 'fetching' || !theme}
                />
            )}
        </>
    );
};

export default StaticPage;
