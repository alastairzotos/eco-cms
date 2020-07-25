import { Container, Paper, Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/Adjust';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { fetch$, IModule } from './core';
import { Body } from './core/theme';

interface ITestState {
    darkMode: boolean;
}

const getState = (state: any): ITestState => state.mymodule;

const isDarkMode = createSelector(
    getState,
    state => state.darkMode
);

export const myModule: IModule = {
    name: 'mymodule',
    reducer: createReducer<ITestState>({ darkMode: false }, {
        set_mode: (state, action) => ({
            ...state,
            darkMode: action.payload
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
                const darkMode = useSelector(isDarkMode);

                return (
                    <>
                        <button
                            onClick={() => dispatch({ type: 'set_mode', payload: !darkMode })}
                        >
                            {darkMode ? 'Light mode' : 'Dark mode'}
                        </button>
                    </>
                );
            }
        }
    ],

    pages: {
        '/get-in-touch': () =>
            <p>Get in touch</p>
    },

    themes: [
        {
            name: 'My Theme',

            renderDefault: ({ page }) => (
                <>
                    <h1>Home page</h1>
                    <h2>{page.title}</h2>
                    <p>{page.content}</p>
                </>
            ),

            renderPageType: {
                home: ({ page }) => (
                    <>
                        <h1>Home page</h1>
                        <h2>{page.title}</h2>
                        <p>{page.content}</p>
                    </>
                ),

                standard: ({ page }) => (
                    <>
                        <h2>{page.title}</h2>
                        <p>{page.content}</p>
                    </>
                )
            }
        },
        {
            name: 'My Theme 2',
            renderDefault: ({ page, location }) => {
                const darkMode = useSelector(isDarkMode);

                return (
                    <>
                        <Body style={{ backgroundColor: darkMode ? 'black' : '#dedede' }} />

                        <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, margin: 30 }}>
                            <Container>
                                <Typography variant="h3">{page.title}</Typography>
                                <Typography variant="overline">{page.description}</Typography>
                            </Container>
                        </Paper>

                        <Container>
                            <Typography>{page.content}</Typography>
                        </Container>
                    </>
                );
            },

            renderPageType: {
                home: ({ page, location }) => {
                    const darkMode = useSelector(isDarkMode);

                    return (
                        <>
                            <Body style={{ backgroundColor: darkMode ? 'black' : '#dedede' }} />

                            <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, margin: 30 }}>
                                <Container>
                                    <Typography variant="h3">{page.title}</Typography>
                                    <Typography variant="overline">{page.description}</Typography>
                                </Container>
                            </Paper>

                            <Container>
                                <Typography>{page.content}</Typography>
                            </Container>
                        </>
                    );
                },

                contact: ({ page }) => {
                    const darkMode = useSelector(isDarkMode);

                    return (
                        <>
                            <Body style={{ backgroundColor: darkMode ? 'black' : '#dedede' }} />

                            <Paper elevation={6} style={{ paddingTop: 200, paddingBottom: 200, margin: 30 }}>
                                <Container>
                                <Typography variant="h1">Contact Us</Typography>
                                    <Typography variant="h3">{page.title}</Typography>
                                    <Typography variant="overline">{page.description}</Typography>
                                </Container>
                            </Paper>

                            <Container>
                                <Typography>{page.content}</Typography>
                            </Container>
                        </>
                    );
                }
            }
        }
    ]
};
