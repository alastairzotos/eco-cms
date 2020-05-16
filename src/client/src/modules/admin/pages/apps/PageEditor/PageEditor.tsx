import PagesIcon from '@material-ui/icons/InsertDriveFile';
import * as React from 'react';
import { Panel } from '~/atomic/atoms/Panel';
import SplitPanel from '~/atomic/atoms/SplitPanel';
import { IAdminPage } from '~/atomic/organisms/AdminLayout';

import { PagesSidePanel } from './components/PagesSidepanel';

const PageEditor: React.FC = () => {
    return (
        <SplitPanel id="main" split="vertical">
            <PagesSidePanel />
            <Panel border="left">right</Panel>
        </SplitPanel>
    );
};

export const pageEditorPage: IAdminPage = {
    title: 'Pages',
    path: '/admin/pages',
    component: PageEditor,
    icon: PagesIcon
};
