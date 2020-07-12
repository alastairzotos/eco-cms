import { IPageComponent, IPageContent } from '@common*';
import { Grid } from '@material-ui/core';
import * as React from 'react';
import { moduleManager } from '~/core';

export const renderComponent = (component: IPageComponent) => {
    const componentInfo = moduleManager.moduleMap[component.type[0]].components[component.type[1]];
    const Component = componentInfo.component;

    const children = component.children
        ? component.children.map(renderComponent)
        : [];

    return <Component key={`comp-${component.order}`} {...component.props}>{children}</Component>;
};

export const renderPage = (pageContent: IPageContent) => {
    return pageContent.rows.map((row, rowIndex) => (
        <Grid container key={`row-${rowIndex}`}>
        {
            row.columns.map((column, columnIndex) => (
                <Grid item key={`col-${columnIndex}`} lg={column.span}>
                {
                    column.children.map(renderComponent)
                }
                </Grid>
            ))
        }
        </Grid>
    ));
};
