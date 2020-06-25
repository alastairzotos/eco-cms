import { LinearProgress } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudUpload';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAdminApp } from '~/core';

import { beginGetFilesAndFolders, setCurrentPath } from '../../actions';
import { getCurrentPath, getFilesAndFolders, getFilesAndFoldersFetchStatus } from '../../selectors/files';
import { getBaseName, getUpperPath } from '../../utils/files';

import { Dropzone } from './components/Dropzone';

const FileManager: React.FC = () => {
    const dispatch = useDispatch();
    const currentPath = useSelector(getCurrentPath);
    const filesAndFoldersFetchStatus = useSelector(getFilesAndFoldersFetchStatus);
    const filesAndFolders = useSelector(getFilesAndFolders);

    React.useEffect(() => {
        dispatch(beginGetFilesAndFolders(currentPath));
    }, [currentPath]);

    return (
        <>
            <Dropzone />

            {filesAndFoldersFetchStatus === 'fetching' && <LinearProgress />}
            {filesAndFoldersFetchStatus === 'error' && <p>There was an error</p>}
            {filesAndFoldersFetchStatus === 'success' && (
                <>
                    <h2>Path: {currentPath}</h2>
                    {currentPath !== '/' && (
                        <a
                            onClick={() => dispatch(setCurrentPath(getUpperPath(currentPath)))}
                        >
                            back
                        </a>
                    )}
                    <h4>Files</h4>
                    {filesAndFolders.files.map(file => (
                        <p key={file.filename}>{getBaseName(file.filename, currentPath)}</p>)
                    )}

                    <h4>Folders</h4>
                    {filesAndFolders.folders.map(folder => (
                        <p key={folder.path}>
                            <a
                                onClick={() => dispatch(setCurrentPath(folder.path))}
                            >
                                {getBaseName(folder.path, currentPath)}
                            </a>
                        </p>
                    ))}
                </>
            )}
        </>
    );
};

export const fileManagerApp: IAdminApp = {
    title: 'Files',
    path: '/files',
    icon: Icon,
    component: FileManager
};
