import { IPage } from '@common';
import {
    AppBar,
    createMuiTheme,
    Dialog,
    IconButton,
    makeStyles,
    MuiThemeProvider,
    Paper,
    Slide,
    Toolbar,
    Typography
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close';
import * as qs from 'qs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { PageRenderer } from '~/modules/pages/components/PageRenderer';

import { getSelectedVariation } from '../selectors';

import { QueryEditor } from './QueryEditor';
import { VariationSelector } from './VariationSelector';

export interface IPagePreviewProps {
    page: IPage;
    open: boolean;
    onClose: () => void;
}

const lightTheme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    main: {
        backgroundColor: 'white'
    },
    preview: {
        height: '100%'
    }
}));

const Transition = React.forwardRef((
        props: TransitionProps & { children?: React.ReactElement },
        ref: React.Ref<unknown>,
    ) => <Slide direction="left" ref={ref} {...props} />);

export const PagePreview: React.FC<IPagePreviewProps> = ({
    page,
    open,
    onClose
}) => {
    const classes = useStyles();

    const version = useSelector(getSelectedVariation);

    const [query, setQuery] = React.useState('');

    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6">{page.title}</Typography>

                    <QueryEditor
                        query={query}
                        onChange={setQuery}
                        page={page}
                        version={version}
                    />

                    <VariationSelector
                        page={page}
                        showAddRemoveButtons={false}
                    />
                </Toolbar>
            </AppBar>

            <MuiThemeProvider theme={lightTheme}>
                <Paper className={classes.preview}>
                    <PageRenderer
                        page={page}
                        deployment="staging"
                        query={qs.parse(query, { ignoreQueryPrefix: true })}
                        version={version}
                    />
                </Paper>
            </MuiThemeProvider>
        </Dialog>
    );
};