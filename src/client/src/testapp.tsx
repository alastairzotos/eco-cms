import Icon from '@material-ui/icons/Adjust';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { fetch$, IModule } from './core';
import { createComponent } from './core/createComponent';

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
    epic: action$ => action$.ofType('inc_count').pipe(
        switchMap(action =>
            fetch$({
                method: 'GET',
                url: '/test'
            }).pipe(
                switchMap(res => {
                    console.log(res);
                    return of({ type: 'nothing' });
                })
            )
        )
    ),
    adminPages: [
        {
            title: 'My App',
            path: '/myapp',
            icon: Icon,
            component: () => {
                const dispatch = useDispatch();
                const count = useSelector(getCount);

                // return (
                //     <>
                //         <button
                //             onClick={() => dispatch({ type: 'inc_count' })}
                //         >Click me</button>

                //         <p>Count: {count}</p>
                //     </>
                // );

                return (
                    <>
                        <form method="post" action="http://localhost:5999/api/upload" encType="multipart/form-data">
                            <input type="file" id="file" name="file" />
                            <input type="submit" value="submit" />
                        </form>
                    </>
                );
            }
        }
    ],

    components: {
        MyComponent1: createComponent(() => (
            <div style={{ border: '1px solid black', padding: 10 }}>
                <h3>A component</h3>
                <p>Testing comp</p>
            </div>
        )),
        MyComponent2: createComponent(() => (
            <div style={{ border: '1px solid green', padding: 10 }}>
                <h3>Another component</h3>
                <p>Testing comp 2</p>
                <p>Test <a href="#">link</a></p>
            </div>
        ))
    }
};
