import { List, ListItem } from '@material-ui/core';
import * as React from 'react';
import { Panel } from '~/atomic/atoms/Panel';
import SplitPanel from '~/atomic/atoms/SplitPanel';
import { ISplitPanelProps } from '~/atomic/atoms/SplitPanel/SplitPanel';

interface IApp {
    id: string;
    name: string;
    component: React.FC;
}

export interface IAppsViewProps {
    apps: IApp[];
    splitPanelProps?: ISplitPanelProps;
    defaultToFirst?: boolean;
}

export const AppsView: React.FC<IAppsViewProps> = ({
    apps,
    splitPanelProps = {
        id: 'apps',
        split: 'vertical'
    },
    defaultToFirst = true
}) => {
    const [selectedApp, setSelectedApp] = React.useState<IApp>(
        defaultToFirst
        ? (
            apps.length > 0
            ? apps[0]
            : null
        )
        : null
    );

    return (
        <SplitPanel {...splitPanelProps}>
            <Panel>
                <List>
                {
                    apps.map(app => (
                        <ListItem
                            key={app.id}
                            button
                            selected={selectedApp && app.id === selectedApp.id}
                            onClick={() => setSelectedApp(app)}
                        >
                            {app.name}
                        </ListItem>
                    ))
                }
                </List>
            </Panel>
            <Panel>
                {selectedApp && (() => {
                    const Component = selectedApp.component;
                    return <Component />;
                })()}
            </Panel>
        </SplitPanel>
    );
};
