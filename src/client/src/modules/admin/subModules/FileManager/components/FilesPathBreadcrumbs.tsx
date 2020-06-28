import { Breadcrumbs, Link, makeStyles, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentPath } from '../actions';
import { getCurrentPath } from '../selectors';

const useStyles = makeStyles(theme => ({
    link: {
        cursor: 'pointer'
    }
}));

export const FilesPathBreadcrumbs: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const currentPath = useSelector(getCurrentPath);

    const parts = ['/', ...currentPath.split('/').filter(part => part !== '')];

    if (parts.length <= 1) {
        return (
            <Breadcrumbs>
                <HomeIcon />
            </Breadcrumbs>
        );
    }

    return (
        <Breadcrumbs>
            {parts.slice(0, parts.length - 1).map((part, index) => (
                <Link
                    key={part + index}
                    color="inherit"
                    className={classes.link}
                    onClick={() => dispatch(setCurrentPath('/' + parts.slice(1, index + 1).join('/')))}
                >
                    {
                        part === '/'
                            ? <HomeIcon />
                            : part
                    }
                </Link>
            ))}

            <Typography color="textPrimary">{parts[parts.length - 1]}</Typography>

        </Breadcrumbs>
    );
};
