export const getBaseName = (filename: string, path?: string) => {
    if (!path) {
        const parts = filename.split('/');
        return parts.pop();
    }

    const basename = filename.substr(path.length);

    if (basename.startsWith('/')) {
        return basename.substring(1);
    }

    return basename;
};

export const getFilePath = (filename: string) => {
    const parts = filename.split('/');
    return parts.slice(0, parts.length - 1).join('/');
};

export const getUpperPath = (path: string) => {
    const parts = path.split('/');
    const upperPath = parts.slice(0, parts.length - 1).join('/');

    if (!upperPath.startsWith('/')) {
        return '/' + upperPath;
    }

    return upperPath;
};

export const validateFilename = (filename: string) =>
    !filename.includes('/') && !filename.includes('..');

export const formatFileSize = (bytes: number, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
};
