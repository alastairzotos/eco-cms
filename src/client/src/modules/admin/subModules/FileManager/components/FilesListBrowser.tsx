import { IFile } from '@common';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import dayjs from 'dayjs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spacer } from '~/atomic/atoms/Spacer';

import { previewFile, setCurrentPath } from '../actions';
import { getCurrentPath, getFilesAndFolders, getPreviewFile } from '../selectors';
import { formatFileSize, getBaseName } from '../utils';

const useStyles = makeStyles(theme => ({
    header: {
        fontWeight: 900
    },
    item: {
        cursor: 'pointer',
        verticalAlign: 'middle',
        display: 'flex'
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));

export const FilesListBrowser: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const filesAndFolders = useSelector(getFilesAndFolders);
    const currentPath = useSelector(getCurrentPath);
    const previewedFile = useSelector(getPreviewFile);

    const files = filesAndFolders.files;
    const folders = filesAndFolders.folders;

    const handleFileClick = (file: IFile) => {
        if (previewedFile && previewedFile.filename === file.filename) {
            dispatch(previewFile(null));
        } else {
            dispatch(previewFile(file));
        }
    };

    return (
        <>
            {folders.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.header}>Folder</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {folders.map(folder => (
                                    <TableRow key={folder.path}>
                                        <TableCell
                                            className={classes.item}
                                            onClick={() => dispatch(setCurrentPath(folder.path))}
                                        >
                                           <FolderIcon className={classes.icon} fontSize="small" />
                                           <span>{getBaseName(folder.path, currentPath)}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

            {folders.length > 0 && files.length > 0 && <Spacer bottom={2} />}

            {files.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell className={classes.header}>File name</TableCell>
                                    <TableCell className={classes.header}>File type</TableCell>
                                    <TableCell className={classes.header}>Size</TableCell>
                                    <TableCell className={classes.header}>Upload date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {files.map(file => (
                                    <TableRow key={file.filename}>
                                        <TableCell
                                            className={classes.item}
                                            onClick={() => handleFileClick(file)}
                                        >
                                            <FileIcon className={classes.icon} fontSize="small" />
                                            <span>{getBaseName(file.filename, currentPath)}</span>
                                        </TableCell>
                                        <TableCell>{file.contentType}</TableCell>
                                        <TableCell>{formatFileSize(file.length)}</TableCell>
                                        <TableCell>{dayjs(file.uploadDate).format('DD/MM/YYYY')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};
