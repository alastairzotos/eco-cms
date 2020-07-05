import { ThemeOptions } from '@material-ui/core';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, RouteComponentProps, Router, Switch, withRouter } from 'react-router-dom';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { IPages } from '~/core/pages';

interface IRootProps {
    store: Store;
    persistor: Persistor;
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
    persistor,
    history,
    pages
}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <WithRouterSwitch pages={pages} />
                </Router>
            </PersistGate>
        </Provider>
    );
};
