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
import { setCurrentPath } from '~/modules/admin/actions';
import { getCurrentPath, getFilesAndFolders } from '~/modules/admin/selectors/files';
import { formatFileSize, getBaseName } from '~/modules/admin/utils/files';

const useStyles = makeStyles(theme => ({
    table: {
        marginBottom: theme.spacing(1)
    },
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

    const files = filesAndFolders.files;
    const folders = filesAndFolders.folders;

    return (
        <>
            {files.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className={classes.table}>
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

            {folders.length > 0 && (
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className={classes.table}>
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
        </>
    );
};
