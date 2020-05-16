import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const bottomToolbarHeight = 25;

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        height: '100vh'
    },
    appBar: {
        width: '100%',
        marginLeft: drawerWidth,
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    titleBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        alignItems: 'stretch',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0),
    },
    innerContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        padding: 0,
        height: `calc(100% - ${theme.mixins.toolbar.minHeight as any + bottomToolbarHeight}px)`
    },
    bottomAppbar: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        top: 'auto',
        bottom: 0,
        height: bottomToolbarHeight,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`
    },
    bottomToolbar: {
        backgroundColor: 'transparent',
        height: bottomToolbarHeight,
    }
}));
