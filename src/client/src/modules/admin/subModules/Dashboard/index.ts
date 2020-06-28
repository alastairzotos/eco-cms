import { IModule } from '~/core';

import { dashboardApp } from './pages/Dashboard';

export const dashboardModule: IModule = {
    name: 'dashboard',
    adminPages: [
        dashboardApp
    ]
};
