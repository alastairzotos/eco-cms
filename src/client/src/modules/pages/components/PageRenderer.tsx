import { IPage } from '@common';
import { ParsedQs } from 'qs';
import * as React from 'react';
import { moduleManager } from '~/core';
import { Runtime } from '~/modules/parser';

export interface IPageRendererProps {
    page: IPage;
    query: ParsedQs;
    deployment: 'staging' | 'production';
    version: number;
}

export const PageRenderer: React.FC<IPageRendererProps> = ({
    page,
    query,
    deployment,
    version,
}) => {
    const runtime = new Runtime(
        moduleManager.components,
        {
            query,

            window,
            console
        }
    );

    if (deployment === 'staging') {
        return <>{runtime.run(page.staging[version])}</>;
    }

    return <>{runtime.run(page.production[version])}</>;
};
