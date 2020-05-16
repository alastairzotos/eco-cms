import { MuiThemeProvider } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PagesIcon from '@material-ui/icons/InsertDriveFile';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout, { IAdminPage } from '~/atomic/organisms/AdminLayout';
import { toggleTheme } from '~/modules/admin/actions';
import { getTheme } from '~/modules/admin/selectors';
import mainTheme from '~/modules/theme';

export const tabs: IAdminPage[] = [
    {
        title: 'Dashboard',
        path: '/admin/dashboard',
        component: () => <p>dashboard</p>,
        icon: DashboardIcon
    },

    {
        title: 'Pages',
        path: '/admin/pages',
        component: () => <p>pages</p>,
        icon: PagesIcon
    }
];

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
                onToggleTheme={() => dispatch(toggleTheme())}
                pages={tabs}
            />
        </MuiThemeProvider>
    );
};

export default AdminPage;
