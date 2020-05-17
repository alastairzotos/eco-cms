import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import history from './history';
import { moduleManager } from './module';
import { Root } from './Root';

export const startApp = () => {
    const rootModule = moduleManager.combineModules('app');

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        rootModule.reducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware
            )
        ),
    );

    epicMiddleware.run(rootModule.epic);

    ReactDOM.render(
        <Root
            store={store}
            history={history}
            pages={rootModule.pages}
        />,

        document.getElementById('app')
    );
};
