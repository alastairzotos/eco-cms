import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderPage } from '~/modules/pages/utils';

import { getTheme } from '../../../AdminCore';
import { getDeletePageStatus, getPages, getSavePageStatus, getSelectedPage, getSelectedVariation, isDirty } from '../../selectors';

import { GridEditor } from './GridEditor';

export const PageEditor: React.FC = () => {
    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getTheme);
    const saveStatus = useSelector(getSavePageStatus);
    const variation = useSelector(getSelectedVariation);
    const dirty = useSelector(isDirty);
    const deleteStatus = useSelector(getDeletePageStatus);

    if (!selectedPage) {
        return <></>;
    }

    return <GridEditor />;
    // return <samp>{JSON.stringify(selectedPage.staging[0], null, 2)}</samp>;
};
