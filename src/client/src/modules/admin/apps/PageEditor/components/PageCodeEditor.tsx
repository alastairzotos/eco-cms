import { InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CodeEditor } from '~/atomic/molecules/CodeEditor';
import { beginSavePage, setPageData } from '~/modules/admin/actions';
import { IPageInfo } from '~/modules/admin/models';
import { getTheme } from '~/modules/admin/selectors';
import { getPages, getSavePageStatus, getSelectedPage } from '~/modules/admin/selectors/pages';
import { isValidUrl } from '~/modules/admin/utils';

export const PageCodeEditor: React.FC = () => {
    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getTheme);
    const saveStatus = useSelector(getSavePageStatus);

    const pageRef = React.useRef<IPageInfo>(null);

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
            content: value
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
        <CodeEditor
            id={selectedPage._id}
            theme={theme}
            content={selectedPage.content}
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
                />
            ]}
        />
    );
};
