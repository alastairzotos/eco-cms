import { localStorageNames } from './localStorage';

export type ISplitDirection = 'horizontal' | 'vertical';

const MIN_SPLIT_SIZE_V = 150;
const DEFAULT_SPLIT_SIZE_V = 300;

const MIN_SPLIT_SIZE_H = 150;
const DEFAULT_SPLIT_SIZE_H = 300;

export const getMinSplitPanelSize = (split: ISplitDirection) =>
    split === 'horizontal' ? MIN_SPLIT_SIZE_H : MIN_SPLIT_SIZE_V;

export const getDefaultSplitPanelSize = (id: string, split: ISplitDirection) =>
    split === 'horizontal'
    ? (
        parseInt(localStorage.getItem(localStorageNames.editor.panel.split(id)), 10)
            || DEFAULT_SPLIT_SIZE_H
    )
    : (
        parseInt(localStorage.getItem(localStorageNames.editor.panel.split(id)), 10)
            || DEFAULT_SPLIT_SIZE_V
    );

export const setSplitPanelSize = (id: string, split: ISplitDirection) =>
    size =>
        split === 'horizontal'
        ? localStorage.setItem(localStorageNames.editor.panel.split(id), String(size))
        : localStorage.setItem(localStorageNames.editor.panel.split(id), String(size));
