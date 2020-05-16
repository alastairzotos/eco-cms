import { Fab, FormControl, Grid, LinearProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getForwardURL } from '~/core';

import { registerUser } from '../../actions';
import { IRegisterResponseType } from '../../models';
import { hasError, isRegistered, isRegistering } from '../../selectors';

import { labels } from './labels';

type IRegisterPagePwdError = 'too-short' | 'dont-match' | null;

interface IRegisterPageState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordError: IRegisterPagePwdError;
}

const MIN_PWD_LENGTH = 8;
const checkPasswords = (pwd1: string, pwd2: string): IRegisterPagePwdError => {
    if (pwd1.length < MIN_PWD_LENGTH) {
        return 'too-short';
    } else if (pwd1 !== pwd2) {
        return 'dont-match';
    } else {
        return null;
    }
};

const getPasswordErrorText = (err: IRegisterPagePwdError): string => {
    switch (err) {
        case 'too-short':
            return labels.errors.password.tooShort;

        case 'dont-match':
            return labels.errors.password.mustMatch;

        case null:
            return null;
    }
};

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: 30
    },
    main: {
        padding: '40 10 10 10',
    },
    submit: {
        marginTop: 20
    }
}));

const RegisterPage: React.FC = () => {
    const submitting = useSelector(isRegistering);
    const error = useSelector(hasError);
    const registered = useSelector(isRegistered);

    const dispatch = useDispatch();

    const classes = useStyles();

    const [state, setState] = React.useState<IRegisterPageState>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordError: null
    });

    const setName = (name: string) => {
        setState({ ...state, name });
    };

    const setEmail = (email: string) => {
        setState({ ...state, email });
    };

    const setPassword = (password: string) => {
        setState({ ...state, password, passwordError: checkPasswords(password, state.confirmPassword) });
    };

    const setConfirmPassword = (confirmPassword: string) => {
        setState({ ...state, confirmPassword, passwordError: checkPasswords(state.password, confirmPassword) });
    };

    const isValid = () =>
        state.email.indexOf('@') > 0 && state.password.length > 0 && state.passwordError === null;

    const hasUserConflictError = (err: IRegisterResponseType) =>
        err && err === IRegisterResponseType.UserExists;

    const onRegisterClick = () => {
        dispatch(registerUser({
            name: state.name,
            email: state.email,
            password: state.password
        }));
    };

    if (registered) {
        return <Redirect to={getForwardURL()} />;
    }

    return (
        <Grid container>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
                <Paper className={classes.paper}>
                   {submitting && <LinearProgress color="primary" />}

                    <div className={classes.main}>
                        <Typography variant="h5" style={{ textAlign: 'center' }}>Register</Typography>

                        {/* {error && <p>{labels.errors.unknown}</p>} */}

                        <FormControl fullWidth>
                            <TextField
                                label={labels.labels.name}
                                value={state.name}
                                onChange={e => setName(e.target.value)}

                                disabled={submitting}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                label={labels.labels.email}
                                value={state.email}
                                onChange={e => setEmail(e.target.value)}

                                error={error}
                                helperText={error && labels.errors.unknown}

                                disabled={submitting}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                type="password"
                                label={labels.labels.password}
                                value={state.password}
                                onChange={e => setPassword(e.target.value)}

                                error={!!state.passwordError}
                                helperText={state.passwordError && getPasswordErrorText(state.passwordError)}

                                disabled={submitting}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                type="password"
                                label={labels.labels.confirm}
                                value={state.confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}

                                disabled={submitting}
                            />
                        </FormControl>

                        <Fab
                            className={classes.submit}
                            variant="extended"
                            color="primary"
                            onClick={onRegisterClick}
                            disabled={!isValid() || submitting}
                        >
                            {labels.register}
                        </Fab>
                    </div>

                </Paper>
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
