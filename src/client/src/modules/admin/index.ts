import { combineModules, IModule } from '~/core';

import { adminCore, IAdminCoreState } from './subModules/AdminCore';
import { dashboardModule } from './subModules/Dashboard';
import { filesModule, IAdminFilesState } from './subModules/FileManager';
import { IAdminPagesState, pageEditorModule } from './subModules/PageEditor';

export interface IAdminState {
    core: IAdminCoreState;
    pages: IAdminPagesState;
    files: IAdminFilesState;
}

export const adminModule: IModule = combineModules(
    'admin',
    adminCore,
    dashboardModule,
    pageEditorModule,
    filesModule
);
