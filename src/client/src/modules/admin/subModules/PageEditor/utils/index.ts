import { IPage, IPageColumn } from '@common';

export const isValidUrl = (pages: IPage[], thisPage: IPage, url: string) =>
    !(pages
        .filter(page => page._id !== thisPage._id)
        .find(page => page.path === url)
    ) &&
    // (/\/[a-zA-Z_\-\/]+/g).test(url);
    url.startsWith('/') &&
    url.split('').every(chr => (
        chr === '/' ||
        chr === '-' ||
        chr === '_' ||
        (chr >= 'a' && chr <= 'z') ||
        (chr >= 'A' && chr <= 'A') ||
        (chr >= '0' && chr <= '9')
    ));
