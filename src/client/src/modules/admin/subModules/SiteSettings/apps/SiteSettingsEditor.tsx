import Icon from '@material-ui/icons/Settings';
import * as React from 'react';
import { Spacer } from '~/atomic/atoms/Spacer';
import { AppsView } from '~/atomic/organisms/AppsView';
import { IAdminApp } from '~/core';

import { NavigationEditor } from '../components/NavigationEditor';
import { ThemeSelector } from '../components/ThemeSelector';

const SiteSettingsEditor: React.FC = () => {
    return (
        <AppsView
            apps={[
                {
                    id: 'theme',
                    name: 'Theme',
                    component: ThemeSelector
                },
                {
                    id: 'navigation',
                    name: 'Navigation',
                    component: NavigationEditor
                }
            ]}
        />
    );
};

export const siteSettingsAdminApp: IAdminApp = {
    title: 'Site Settings',
    path: '/settings',
    component: SiteSettingsEditor,
    icon: Icon
};
