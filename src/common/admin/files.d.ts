export interface IFolder {
    _id?: string;
    path: string;
}

export interface IFile {
    _id?: string;
    length: number;
    uploadDate: Date;
    filename: string;
    contentType: string;
}

export interface IFilesAndFolders {
    files: IFile[];
    folders: IFolder[];
}
