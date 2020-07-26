import { Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IThemeRenderProps } from '~/core/theme';

import { PageTemplate } from './PageTemplate';

export const NotFoundPage: React.FC<IThemeRenderProps> = ({ navigation, loading }) =>
    <PageTemplate
        title="Page not found"
        subtitle="We cannot locate the page you're looking for"
        navigation={navigation}
        loading={loading}
    >
        <Typography>
            Return <Link to="/">home</Link>
        </Typography>
    </PageTemplate>;
