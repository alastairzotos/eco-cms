import { ColumnSpan, IPageRow } from '@common';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    getSelectedPage,
    getSelectedVariation
} from '../../selectors';

import { AddRowButton } from './AddRowButton';
import { EditableRow } from './EditableRow';

const useStyles = makeStyles(theme => ({
    rowActions: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

export const GridEditor: React.FC = () => {
    const classes = useStyles();

    const selectedPage = useSelector(getSelectedPage);
    const variation = useSelector(getSelectedVariation);

    // const content = selectedPage.staging[variation];
    const [content, setContent] = React.useState(selectedPage.staging[variation]);

    const handleAddRow = (spans: ColumnSpan[]) => {
        setContent({
            ...content,
            rows: [
                ...content.rows,
                {
                    columns: spans.map(span => ({
                        span,
                        children: []
                    }))
                }
            ]
        });
    };

    const handleRowUpdate = (newRow: IPageRow, index: number) => {
        setContent({
            ...content,
            rows: content.rows.map((row, rowIndex) =>
                rowIndex === index
                ? newRow
                : row
            )
        });
    };

    return (
        <>
            {
                content.rows.map((row, rowIndex) => (
                    <EditableRow
                        key={`row-${rowIndex}`}
                        row={row}
                        onUpdate={newRow => handleRowUpdate(newRow, rowIndex)}
                    />
                ))
            }

            <div className={classes.rowActions}>
                <AddRowButton
                    onAddRow={handleAddRow}
                />
            </div>
        </>
    );
};
