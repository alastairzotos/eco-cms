import * as Mui from '@material-ui/core'; //tslint:disable-line
import * as React from 'react';
import { IComponents } from '~/core';
import { createComponent } from '~/core/createComponent';

interface TypographyProps {
    variant: 'button' | 'caption'
        | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        | 'inherit'
        | 'subtitle1' | 'subtitle2'
        | 'body1' | 'body2' | 'overline' | 'srOnly';

    content: string;
}

export const components: IComponents = {
    Typography: createComponent<TypographyProps>(
        ({ variant = 'inherit', content = 'Text' }) => (
            <Mui.Typography variant={variant}>{content}</Mui.Typography>
        ),
        {
            type: 'object',
            properties: {
                content: {
                    type: 'string'
                }
            }
        }
    )
};
