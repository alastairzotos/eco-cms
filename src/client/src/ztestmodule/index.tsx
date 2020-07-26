import * as React from 'react';

import { IModule } from '../core';

import { ContactPage } from './ContactPage';
import { DefaultPage } from './DefaultPage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

export const myModule: IModule = {
    name: 'mymodule',
    themes: [
        {
            name: 'My Theme 2',
            renderDefault: DefaultPage,

            renderPageType: {
                home: HomePage,
                contact: ContactPage
            },

            render404: NotFoundPage
        }
    ]
};
