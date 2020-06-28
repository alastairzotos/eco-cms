import DashboardIcon from '@material-ui/icons/Dashboard';
import * as React from 'react';
import { IAdminApp } from '~/core';

const Dashboard: React.FC = () => {
    return <p>dashboard</p>;
};

export const dashboardApp: IAdminApp = {
    title: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    icon: DashboardIcon
};
