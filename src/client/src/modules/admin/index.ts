import { combineModules, IModule } from '~/core';

import { adminCore, IAdminCoreState } from './subModules/AdminCore';
import { dashboardModule } from './subModules/Dashboard';
import { filesModule, IAdminFilesState } from './subModules/FileManager';
import { IAdminPageEditorState, pageEditorModule } from './subModules/PageEditor';
import { IAdminSiteSettingsState, siteSettingsModule } from './subModules/SiteSettings';

export interface IAdminState {
    core: IAdminCoreState;
    pageEditor: IAdminPageEditorState;
    files: IAdminFilesState;
    siteSettings: IAdminSiteSettingsState;
}

export const adminModule: IModule = combineModules(
    'admin',
    adminCore,
    dashboardModule,
    pageEditorModule,
    filesModule,
    siteSettingsModule
);
