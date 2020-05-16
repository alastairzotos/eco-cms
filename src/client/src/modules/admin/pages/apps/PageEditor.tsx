import PagesIcon from '@material-ui/icons/InsertDriveFile';
import * as React from 'react';
import { IAdminPage } from '~/atomic/organisms/AdminLayout';

const PageEditor: React.FC = () => {
    return <p>page editor</p>;
};

export const pageEditorPage: IAdminPage = {
    title: 'Pages',
    path: '/admin/pages',
    component: PageEditor,
    icon: PagesIcon
};
