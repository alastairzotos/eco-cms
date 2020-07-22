import Icon from '@material-ui/icons/Settings';
import * as React from 'react';
import { IAdminApp } from '~/core';

import { ThemeSelector } from '../components/ThemeSelector';

const SiteSettingsEditor: React.FC = () => {
    return (
        <>
            <ThemeSelector />
        </>
    );
};

export const siteSettingsAdminApp: IAdminApp = {
    title: 'Site Settings',
    path: '/settings',
    component: SiteSettingsEditor,
    icon: Icon
};
