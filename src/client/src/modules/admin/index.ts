import { combineModules, IModule } from '~/core';

import { dashboardModule } from './subModules/Dashboard';
import { filesModule, IAdminFilesState } from './subModules/FileManager';
import { IAdminMainState, mainAdmin } from './subModules/Main';
import { IAdminPagesState, pageEditorModule } from './subModules/PageEditor';

export interface IAdminState {
    main: IAdminMainState;
    pages: IAdminPagesState;
    files: IAdminFilesState;
}

export const adminModule: IModule = combineModules(
    'admin',
    mainAdmin,
    dashboardModule,
    pageEditorModule,
    filesModule
);
