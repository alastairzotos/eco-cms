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
    root: {
        boxShadow: `0px 0px 5px 0px ${theme.palette.action.selected}`
    },
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

    const [hovered, setHovered] = React.useState(false);

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
        <div
            className={cx({ [classes.root]: hovered })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {
                content.rows.map((row, rowIndex) => (
                    <EditableRow
                        key={`row-${rowIndex}`}
                        row={row}
                        onUpdate={newRow => handleRowUpdate(newRow, rowIndex)}
                    />
                ))
            }

            {hovered && (
                <div className={classes.rowActions}>
                    <AddRowButton
                        onAddRow={handleAddRow}
                    />
                </div>
            )}
        </div>
    );
};
