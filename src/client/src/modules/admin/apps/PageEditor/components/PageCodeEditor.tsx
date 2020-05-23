import {
    Button,
    InputAdornment,
    TextField
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CodeEditor } from '~/atomic/molecules/CodeEditor';
import { beginSavePage, setPageData } from '~/modules/admin/actions';
import { IPageInfo } from '~/modules/admin/models';
import { getTheme } from '~/modules/admin/selectors';
import { getPages, getSavePageStatus, getSelectedPage, getSelectedVersion } from '~/modules/admin/selectors/pages';
import { isValidUrl } from '~/modules/admin/utils';

import { PagePreview } from './PagePreview';
import { VersionSelector } from './VersionSelector';

export const PageCodeEditor: React.FC = () => {
    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getTheme);
    const saveStatus = useSelector(getSavePageStatus);
    const version = useSelector(getSelectedVersion);

    const pageRef = React.useRef<IPageInfo>(null);
    const [previewing, setPreviewing] = React.useState(false);

    if (!selectedPage) {
        return <></>;
    }

    pageRef.current = selectedPage;

    const pathIsValid = () => isValidUrl(pages, selectedPage, selectedPage.path);

    const handleScroll = (scroll: number) => {
        dispatch(setPageData({
            ...pageRef.current,
            scroll
        }));
    };

    const handleSave = () => {
        dispatch(beginSavePage(pageRef.current));
    };

    const handleChange = (value: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            staging: pageRef.current.staging
                .map((current, index) =>
                    index === version
                    ? value
                    : current
                )
        }));
    };

    const handlePathChange = (path: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            path
        }));
    };

    const handleTitleChange = (title: string) => {
        dispatch(setPageData({
            ...pageRef.current,
            title
        }));
    };

    return (
        <>
            <CodeEditor
                id={selectedPage._id}
                theme={theme}
                content={selectedPage.staging[version]}
                scroll={pageRef.current.scroll}
                saving={saveStatus === 'fetching'}

                handleScroll={handleScroll}
                handleSave={handleSave}
                handleChange={handleChange}

                toolbar={[
                    <TextField
                        disabled={saveStatus === 'fetching'}
                        value={selectedPage.path}
                        onChange={e => handlePathChange(e.target.value)}

                        error={!pathIsValid()}

                        InputProps={{
                            startAdornment: <InputAdornment position="start">path</InputAdornment>
                        }}
                    />,

                    <TextField
                        disabled={saveStatus === 'fetching'}
                        value={selectedPage.title}
                        onChange={e => handleTitleChange(e.target.value)}

                        InputProps={{
                            startAdornment: <InputAdornment position="start">title</InputAdornment>
                        }}
                    />,

                    <VersionSelector page={pageRef.current} />,

                    <Button
                        onClick={() => setPreviewing(true)}
                    >Preview</Button>
                ]}
            />

            <PagePreview
                page={pageRef.current}
                open={previewing}
                onClose={() => setPreviewing(false)}
            />
        </>
    );
};
