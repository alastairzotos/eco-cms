import { Typography } from '@material-ui/core';
import * as React from 'react';
import { IThemeRenderProps } from '~/core/theme';

import { PageTemplate } from './PageTemplate';

export const ContactPage: React.FC<IThemeRenderProps> = ({ page, navigation, loading }) =>
    <PageTemplate
        title={page.title}
        subtitle={page.description}
        navigation={navigation}
        loading={loading}
    >
        <Typography>{page.content}</Typography>
        <p>This is the contact form</p>
    </PageTemplate>;
