import { IPage } from '@common';
import { InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';

export interface IQueryEditorProps {
    query: string;
    page: IPage;
    version: number;
    onChange: (query: string) => void;
}

export const QueryEditor: React.FC<IQueryEditorProps> = ({
    query,
    page,
    version,
    onChange
}) => {
    let url: string;
    if (!!version) {
        url = `mysite.com${page.path}?v=${version + 1}&`;
    } else {
        url = `mysite.com${page.path}?`;
    }

    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{url}</InputAdornment>
                )
            }}

            value={query}
            onChange={event => onChange(event.target.value)}
        />
    );
};
