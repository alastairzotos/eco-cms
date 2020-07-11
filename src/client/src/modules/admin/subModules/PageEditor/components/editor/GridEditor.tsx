import { ColumnSpan, IPageColumn, IPageRow } from '@common';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
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

    const handleColumnUpdate = (newColumn: IPageColumn, rowIndex: number, colIndex: number) => {
        const row = content.rows[rowIndex];

        handleRowUpdate({
            ...row,
            columns: row.columns.map((col, index) =>
                colIndex === index
                    ? newColumn
                    : col
            )
        }, rowIndex);
    };

    const getUpdatedColumns = (
        srcRow: number,
        destRow: number,
        srcCol: number,
        destCol: number,
        srcIndex: number,
        destIndex: number
    ) => {
        const col1 = content.rows[srcRow].columns[srcCol];
        const col2 = content.rows[destRow].columns[destCol];

        const col1Children = [...col1.children];
        const col2Children = [...col2.children];

        const [removed] = col1Children.splice(srcIndex, 1);
        col2Children.splice(destIndex, 0, removed);

        return [
            { ...col1, children: col1Children },
            { ...col2, children: col2Children }
        ];
    };

    const getUpdatedRows = (
        srcRow: number,
        destRow: number,
        srcCol: number,
        destCol: number,
        srcIndex: number,
        destIndex: number
    ) => {
        const row1 = content.rows[srcRow];
        const row2 = content.rows[destRow];

        const [updatedCol1, updatedCol2] = getUpdatedColumns(
            srcRow,
            destRow,
            srcCol,
            destCol,
            srcIndex,
            destIndex
        );

        const row1Columns = row1.columns.map((col, index) =>
            index === srcCol
                ? updatedCol1
                : col
        );

        const row2Columns = row2.columns.map((col, index) =>
            index === destCol
                ? updatedCol2
                : col
        );

        return [
            { ...row1, columns: row1Columns },
            { ...row2, columns: row2Columns }
        ];
    };

    const updateGrid = (
        srcRow: number,
        destRow: number,
        srcCol: number,
        destCol: number,
        srcIndex: number,
        destIndex: number
    ) => {
        const [updatedRow1, updatedRow2] = getUpdatedRows(
            srcRow,
            destRow,
            srcCol,
            destCol,
            srcIndex,
            destIndex
        );

        setContent({
            ...content,
            rows: content.rows.map((row, index) =>
                index === srcRow
                    ? updatedRow1
                    : index === destRow
                        ? updatedRow2
                        : row
            )
        });
    };

    const reorderColumn = (
        rowIndex: number,
        colIndex: number,
        startIndex: number,
        endIndex: number
    ) => {
        const col = content.rows[rowIndex].columns[colIndex];
        const children = [...col.children];

        const [removed] = children.splice(startIndex, 1);
        children.splice(endIndex, 0, removed);

        handleColumnUpdate(
            { ...col, children },
            rowIndex,
            colIndex
        );
    };

    const moveBetweenColumns = (
        rowIndex: number,
        startCol: number,
        endCol: number,
        startIndex: number,
        endIndex: number
    ) => {
        handleRowUpdate({
            ...content.rows[rowIndex],
            columns: content.rows[rowIndex].columns.map((col, colIndex) =>
                colIndex === startCol
                    ? {
                        ...col,
                        children: col.children.filter((_, childIndex) => childIndex !== startIndex)
                    }
                    : (
                        colIndex === endCol
                            ? {
                                ...col,
                                children: [
                                    ...col.children.slice(0, endIndex),
                                    content.rows[rowIndex].columns[startCol].children[startIndex],
                                    ...col.children.slice(endIndex)
                                ]
                            }
                            : col
                    )
            )
        }, rowIndex);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const [srcRow, srcCol] = source.droppableId.split('-').map(i => parseInt(i, 10));
        const srcIndex = source.index;

        const [destRow, destCol] = destination.droppableId.split('-').map(i => parseInt(i, 10));
        const destIndex = destination.index;

        if (srcRow === destRow) {
            if (srcCol === destCol) {
                reorderColumn(srcRow, srcCol, srcIndex, destIndex);
            } else {
                moveBetweenColumns(srcRow, srcCol, destCol, srcIndex, destIndex);
            }
        } else {
            updateGrid(
                srcRow,
                destRow,
                srcCol,
                destCol,
                srcIndex,
                destIndex
            );
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    content.rows.map((row, rowIndex) => (
                        <EditableRow
                            path={[rowIndex]}
                            key={`row-${rowIndex}`}
                            row={row}
                            onUpdate={newRow => handleRowUpdate(newRow, rowIndex)}
                        />
                    ))
                }
            </DragDropContext>

            <div className={classes.rowActions}>
                <AddRowButton
                    onAddRow={handleAddRow}
                />
            </div>
        </>
    );
};
