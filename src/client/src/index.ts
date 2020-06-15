import { ThemeOptions } from '@material-ui/core';
import { start } from '~/modules/start';
import * as components from '~/staticComponents';

import { filesModule } from './files';
import { myModule } from './testapp';

start(components, [myModule, filesModule]);
