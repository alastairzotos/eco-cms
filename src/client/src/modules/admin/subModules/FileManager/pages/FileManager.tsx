import Icon from '@material-ui/icons/CloudUpload';
import * as React from 'react';
import { IAdminApp } from '~/core';

import { Dropzone } from '../components/Dropzone';
import { FilesBrowser } from '../components/FilesBrowser';

const FileManager: React.FC = () => {
    return (
        <>
            <Dropzone />
            <FilesBrowser />
        </>
    );
};

export const fileManagerApp: IAdminApp = {
    title: 'Files',
    path: '/files',
    icon: Icon,
    component: FileManager
};
