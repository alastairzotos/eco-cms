export const getBaseName = (filename: string, path: string) => {
    const basename = filename.substr(path.length);

    if (basename.startsWith('/')) {
        return basename.substring(1);
    }

    return basename;
};

export const getUpperPath = (path: string) => {
    const parts = path.split('/');
    const upperPath = parts.slice(0, parts.length - 1).join('/');

    if (!upperPath.startsWith('/')) {
        return '/' + upperPath;
    }

    return upperPath;
};
