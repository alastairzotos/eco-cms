import { makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import { Spacer } from '~/atomic/atoms/Spacer';

import { DescInput } from './DescInput';
import { PageTypeSelect } from './PageTypeSelect';
import { PathInput } from './PathInput';
import { PublishButton } from './PublishButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2)
    }
}));

export const PageSettings: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={2}>
            <PublishButton />
            <Spacer top={2} />
            <PathInput />
            <Spacer top={2} />
            <DescInput />
            <Spacer top={2} />
            <PageTypeSelect />
        </Paper>
    );
};
