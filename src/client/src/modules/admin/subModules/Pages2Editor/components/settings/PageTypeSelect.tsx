import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedTheme } from '../../../SiteSettings';
import { setPageData } from '../../actions';
import { getSelectedPage } from '../../selectors';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));

export const PageTypeSelect: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const selectedPage = useSelector(getSelectedPage);
    const theme = useSelector(getSelectedTheme);

    if (!theme || !theme.renderPageType) {
        return <></>;
    }

    const handleTypeChange = (pageType: string) => {
        dispatch(setPageData({
            ...selectedPage,
            pageType: pageType === '__default__' ? null : pageType
        }));
    };

    return (
        <FormControl className={classes.root}>
            <InputLabel id="page-type-select">Page Type</InputLabel>
            <Select
                labelId="page-type-select"
                value={selectedPage.pageType || '__default__'}
                onChange={e => handleTypeChange(e.target.value as string)}
            >
                <MenuItem value={'__default__'}>Default</MenuItem>
                {
                    Object.keys(theme.renderPageType).map(pageType => (
                        <MenuItem key={pageType} value={pageType}>{pageType}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};
