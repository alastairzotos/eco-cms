import Icon from '@material-ui/icons/CloudUpload';
import * as React from 'react';
import { IAdminApp } from '~/core';

import { Dropzone } from './components/Dropzone';

const FileManager: React.FC = () => {
    return (
        <>
            <Dropzone />
        </>
    );
};

export const fileManagerApp: IAdminApp = {
    title: 'Files',
    path: '/files',
    icon: Icon,
    component: FileManager
};
