import { cyan as main, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { common } from './common';

export const dark = createMuiTheme({
    palette: {
        type: 'dark',

        primary: main,
        background: {
            default: '#150015',
            paper: '#110011'
        },
        // divider: red[400],
        // text: {
        //     primary: '#ffffff'
        // },

        // action: {
        //     hover: main[900],
        //     selected: main.A700
        // }
    },

    typography: {
        // fontFamily: 'Monaco, "Courier New", Courier, monospace'
        // fontFamily: 'Menlo, Monaco, "Courier New", monospace'
    },

    mixins: {
        toolbar: {
            ...common.toolbar,

            color: '#cceeff',
            backgroundColor: main[500] // '#660066', // teal.A700,
        }
    }
});
