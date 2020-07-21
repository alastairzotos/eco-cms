import PagesIcon from '@material-ui/icons/InsertDriveFile';
import * as React from 'react';
import { Panel } from '~/atomic/atoms/Panel';
import SplitPanel from '~/atomic/atoms/SplitPanel';
import { IAdminApp } from '~/core';

import { PagesSidePanel } from '../components/PagesSidepanel';

const PageEditor: React.FC = () => {
    return (
        <SplitPanel id="main" split="vertical">
            <PagesSidePanel />
            <Panel border="left">
                <p>page editor</p>
            </Panel>
        </SplitPanel>
    );
};

export const pageEditorApp: IAdminApp = {
    title: 'Pages (2)',
    path: '/pages2',
    component: PageEditor,
    icon: PagesIcon
};
