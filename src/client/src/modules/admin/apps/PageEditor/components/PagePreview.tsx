import { IPage } from '@common';
import { AppBar, Dialog, IconButton, makeStyles, Slide, Toolbar, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close';
import * as qs from 'qs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedVersion } from '~/modules/admin/selectors/pages';
import { PageRenderer } from '~/modules/pages/components/PageRenderer';

import { QueryEditor } from './QueryEditor';
import { VersionSelector } from './VersionSelector';

export interface IPagePreviewProps {
    page: IPage;
    open: boolean;
    onClose: () => void;
}

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

    const version = useSelector(getSelectedVersion);

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

                    <VersionSelector
                        page={page}
                        showAddRemoveButtons={false}
                    />
                </Toolbar>
            </AppBar>

            <PageRenderer
                page={page}
                deployment="staging"
                query={qs.parse(query, { ignoreQueryPrefix: true })}
                version={version}
            />
        </Dialog>
    );
};
