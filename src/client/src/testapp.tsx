import Icon from '@material-ui/icons/Adjust';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IModule } from './core';

interface ITestState {
    count: number;
}

const getState = (state: any): ITestState => state.mymodule;

const getCount = createSelector(
    getState,
    state => state.count
);

export const myModule: IModule = {
    name: 'mymodule',
    reducer: createReducer<ITestState>({ count: 0 }, {
        inc_count: state => ({
            count: state.count + 1
        })
    }),
    adminPages: [
        {
            title: 'My App',
            path: '/myapp',
            icon: Icon,
            component: () => {
                const dispatch = useDispatch();
                const count = useSelector(getCount);

                return (
                    <>
                        <button
                            onClick={() => dispatch({ type: 'inc_count' })}
                        >Click me</button>

                        <p>Count: {count}</p>
                    </>
                );
            }
        }
    ]
};
