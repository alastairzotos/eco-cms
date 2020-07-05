import { IPageComponent, IPageContent } from '@common*';
import * as React from 'react';
import { moduleManager } from '~/core';
import { Column, Row } from '~/modules/core/components';

export const renderComponent = (component: IPageComponent) => {
    const Component = moduleManager.moduleMap[component.type[0]].components[component.type[1]];

    const children = component.children
        ? component.children.map(renderComponent)
        : [];

    return <Component key={`comp-${component.order}`} {...component.props}>{children}</Component>;
};

export const renderPage = (pageContent: IPageContent) => {
    return pageContent.rows.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
        {
            row.columns.map((column, columnIndex) => (
                <Column key={`col-${columnIndex}`} span={column.span}>
                {
                    column.children.map(renderComponent)
                }
                </Column>
            ))
        }
        </Row>
    ));
};
