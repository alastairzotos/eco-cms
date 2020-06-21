import { Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudUpload';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAdminApp } from '~/core';

import { beginUploadFile } from '../../actions';
import { getUploadStatus } from '../../selectors/files';

const FileManager: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector(getUploadStatus);

    const [files, setFiles] = React.useState(null);

    return (
        <>
            {status === 'fetching' && <p>Uploading...</p>}
            {status === 'success' && <p>Success</p>}
            {status === 'error' && <p>Error</p>}

            <input
                type="file"
                multiple
                onChange={e => setFiles(e.target.files)}
            />
            <br />

            <Fab
                size="small"
                variant="extended"
                onClick={() => dispatch(beginUploadFile(files))}
            >
                Upload files
            </Fab>
        </>
    );
};

export const fileManagerApp: IAdminApp = {
    title: 'Files',
    path: '/files',
    icon: Icon,
    component: FileManager
};
