import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '~/atomic/organisms/AdminLayout';
import { setTheme } from '~/core';
import { toggleTheme } from '~/modules/admin/actions';
import { getTheme } from '~/modules/admin/selectors';
import mainTheme from '~/modules/theme';

import { apps } from '../apps';

const AdminPage: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useSelector(getTheme);

    return (
        <MuiThemeProvider
            theme={
                theme === 'light'
                    ? mainTheme.light
                    : mainTheme.dark
            }
        >
            <AdminLayout
                currentTheme={theme}
                onToggleTheme={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                    dispatch(toggleTheme());
                }}
                pages={apps}
            />
        </MuiThemeProvider>
    );
};

export default AdminPage;
