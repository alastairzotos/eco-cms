import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from './history';
import { moduleManager } from './module';
import { Root } from './Root';

export const startApp = () => {
    const rootModule = moduleManager.combineModules('app');

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const persistConfig = {
        key: 'root',
        storage
    };

    const persistedReducer = persistReducer(persistConfig, rootModule.reducer);

    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        persistedReducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware
            )
        ),
    );

    const persistor = persistStore(store);

    epicMiddleware.run(rootModule.epic);

    rootModule.onInit(action => store.dispatch(action));

    ReactDOM.render(
        <Root
            store={store}
            persistor={persistor}
            history={history}
            pages={rootModule.pages}
        />,

        document.getElementById('app')
    );
};
