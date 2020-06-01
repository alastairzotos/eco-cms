import { ThemeOptions } from '@material-ui/core';
import { start } from '~/modules/start';
import * as components from '~/staticComponents';

import { myModule } from './testapp';

const theme: ThemeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#00ff00'
        }
    }
};

start(components, theme, [myModule]);
