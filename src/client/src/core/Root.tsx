import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, RouteComponentProps, Router, Switch, withRouter } from 'react-router-dom';
import { Store } from 'redux';
import { IPages } from '~/core/pages';

interface IRootProps {
    store: Store;
    history: History<{}>;
    pages: IPages;
}

const RouteSwitch: React.FC<{
    pages: IPages
} & RouteComponentProps> = ({
    pages,
    ...props
}) => (
    <Switch>
    {
        Object.keys(pages).map(url => {
            return (
                <Route
                    key={url}
                    path={url}
                    exact
                    component={pages[url]}
                />
            );
        })
    }
    </Switch>
);

const WithRouterSwitch = withRouter(RouteSwitch);

export const Root: React.FC<IRootProps> = ({
    store,
    history,
    pages
}) => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <WithRouterSwitch pages={pages} />
            </Router>
        </Provider>
    );
};
