import DashboardIcon from '@material-ui/icons/Dashboard';
import * as React from 'react';
import { IAdminPage } from '~/atomic/organisms/AdminLayout';

const Dashboard: React.FC = () => {
    return <p>dashboard!!!</p>;
};

export const dashboardPage: IAdminPage = {
    title: 'Dashboard',
    path: '/admin/dashboard',
    component: Dashboard,
    icon: DashboardIcon
};
