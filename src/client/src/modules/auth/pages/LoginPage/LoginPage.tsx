import { Fab, FormControl, Grid, LinearProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getForwardURL } from '~/core';

import { loginUser } from '../../actions';
import { getLoginError, isLoggedIn, isLoggingIn } from '../../selectors';

import { labels } from './labels';

interface ILoginPageState {
    email: string;
    password: string;
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: 40
    },
    main: {
        padding: '40 10 10 10'
    },
    submit: {
        marginTop: 20
    },
    signUp: {
        marginTop: 20
    }
}));

const LoginPage: React.FC = () => {
    const loggingIn = useSelector(isLoggingIn);
    const loginError = useSelector(getLoginError);
    const loggedIn = useSelector(isLoggedIn);

    const dispatch = useDispatch();

    const classes = useStyles();

    const [state, setState] = React.useState<ILoginPageState>({
        email: '',
        password: ''
    });

    const setEmail = (email: string) => {
        setState({ ...state, email });
    };

    const setPassword = (password: string) => {
        setState({ ...state, password });
    };

    const isValid = () =>
        state.email !== '' && state.password !== '';

    const onLoginClick = () => {
        dispatch(loginUser({
            email: state.email,
            password: state.password
        }));
    };

    if (loggedIn) {
        return <Redirect to={getForwardURL()} />;
    }

    return (
        <Grid container>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    {loggingIn && <LinearProgress color="primary" />}

                    <div className={classes.main}>
                        <Typography variant="h5" style={{ textAlign: 'center' }}>{labels.title}</Typography>

                        <FormControl fullWidth>
                            <TextField
                                label={labels.labels.email}
                                value={state.email}
                                onChange={e => setEmail(e.target.value)}

                                disabled={loggingIn}

                                error={!!loginError}
                                helperText={loginError && labels.errors.loginError}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                type="password"
                                label={labels.labels.password}
                                value={state.password}
                                onChange={e => setPassword(e.target.value)}

                                disabled={loggingIn}
                            />
                        </FormControl>

                        <Fab
                            className={classes.submit}
                            variant="extended"
                            color="primary"
                            onClick={onLoginClick}
                            disabled={!isValid() || loggingIn}
                        >
                            {labels.login}
                        </Fab>

                        <Typography className={classes.signUp}>
                            {labels.register.a}
                            <a href={`/register?fwd=${encodeURIComponent(getForwardURL())}`}>{labels.register.b}</a>
                        </Typography>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
