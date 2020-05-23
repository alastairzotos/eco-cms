import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CodeEditor } from '~/atomic/molecules/CodeEditor';
import { beginSavePage, setPageData } from '~/modules/admin/actions';
import { IPageInfo } from '~/modules/admin/models';
import { getTheme } from '~/modules/admin/selectors';
import { getPages, getSavePageStatus, getSelectedPage } from '~/modules/admin/selectors/pages';
import { isValidUrl } from '~/modules/admin/utils';

const useStyles = makeStyles(theme => ({
    versionSelector: {
        minWidth: 200,
        display: 'inline-block'
    },
    versionSelectorDropdown: {
        width: 150
    }
}));

export const PageCodeEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getTheme);
    const saveStatus = useSelector(getSavePageStatus);

    const pageRef = React.useRef<IPageInfo>(null);
    const [version, setVersion] = React.useState(0);

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

    const handleCreateVersion = () => {
        dispatch(setPageData({
            ...pageRef.current,
            staging: [
                ...pageRef.current.staging,
                pageRef.current.staging[pageRef.current.staging.length - 1]
            ]
        }));

        setVersion(pageRef.current.staging.length);
    };

    return (
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

                <FormControl className={classes.versionSelector}>
                    <InputLabel id="version-label">Version</InputLabel>
                    <Select
                        className={classes.versionSelectorDropdown}
                        labelId="version-label"
                        value={version}
                        onChange={(event: React.ChangeEvent<{value: number}>) => setVersion(event.target.value)}
                    >
                    {
                        Array.from(Array(pageRef.current.staging.length).keys()).map(vn =>
                            <MenuItem key={vn} value={vn}>{vn + 1}</MenuItem>
                        )
                    }
                    </Select>
                    <IconButton
                        size="small"
                        onClick={handleCreateVersion}
                    >
                        <Add />
                    </IconButton>
                </FormControl>
            ]}
        />
    );
};
