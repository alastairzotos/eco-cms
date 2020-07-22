import { combineModules, IModule } from '~/core';

import { adminCore, IAdminCoreState } from './subModules/AdminCore';
import { dashboardModule } from './subModules/Dashboard';
import { filesModule, IAdminFilesState } from './subModules/FileManager';
import { IAdminPagesState, pageEditorModule } from './subModules/PageEditor';
import { IAdminPages2State, pages2Module } from './subModules/Pages2Editor';
import { IAdminSiteSettingsState, siteSettingsModule } from './subModules/SiteSettings';

export interface IAdminState {
    core: IAdminCoreState;
    pages: IAdminPagesState;
    pages2: IAdminPages2State;
    files: IAdminFilesState;
    siteSettings: IAdminSiteSettingsState;
}

export const adminModule: IModule = combineModules(
    'admin',
    adminCore,
    dashboardModule,
    pageEditorModule,
    pages2Module,
    filesModule,
    siteSettingsModule
);
