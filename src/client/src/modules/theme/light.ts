import { amber as primary, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { common } from './common';

export const light = createMuiTheme({
    palette: {
        type: 'light',

        primary,

        action: {
            hover: orange[100],
            selected: orange[300]
        }
    },

    mixins: {
        toolbar: {
            ...common.toolbar
        }
    }
});
