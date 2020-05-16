export const getURLParameters = (search: string): { [key: string]: string } => {
    const params = {};

    if (search.length > 0) {
        if (search.startsWith('?')) {
            search = search.substr(1);
        }

        search.split('&').forEach(pairs => {
            const [key, value] = pairs.split('=');

            params[key] = value;
        });
    }

    return params;
};

export const getForwardURL = (): string => {
    const fwd = getURLParameters(window.location.search).fwd;

    if (fwd) {
        return decodeURIComponent(fwd);
    }

    return '/';
};
