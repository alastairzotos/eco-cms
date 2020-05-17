import * as React from 'react';

export interface IAdminApp {
    title: string;
    path: string;
    component: React.FC<any>;
    icon: React.FC<any>;
}
