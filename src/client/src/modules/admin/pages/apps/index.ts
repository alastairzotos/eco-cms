import { IAdminPage } from '~/atomic/organisms/AdminLayout';

import { dashboardPage } from './Dashboard';
import { pageEditorPage } from './PageEditor';

export const apps: IAdminPage[] = [
    dashboardPage,
    pageEditorPage
];
