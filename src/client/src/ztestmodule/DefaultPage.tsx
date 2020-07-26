import { Typography } from '@material-ui/core';
import * as React from 'react';
import { IThemeRenderProps } from '~/core/theme';

import { PageTemplate } from './PageTemplate';

export const DefaultPage: React.FC<IThemeRenderProps> = ({ page, navigation, loading }) =>
    <PageTemplate
        title={page.title}
        subtitle={page.description}
        navigation={navigation}
        loading={loading}
    >
        <Typography>{page.content}</Typography>
    </PageTemplate>;
