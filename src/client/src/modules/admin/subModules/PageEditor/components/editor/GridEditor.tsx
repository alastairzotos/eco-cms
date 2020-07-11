import { ColumnSpan, IPageColumn, IPageContent, IPageRow } from '@common';
import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import {
    getSelectedPage,
    getSelectedVariation
} from '../../selectors';

import { AddRowButton } from './AddRowButton';
import { ComponentTrash } from './ComponentTrash';
import { EditableRow } from './EditableRow';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    rowActions: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const getUpdatedColumns = (
    content: IPageContent,
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
    content: IPageContent,
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
        content,
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

export const GridEditor: React.FC = () => {
    const classes = useStyles();

    const selectedPage = useSelector(getSelectedPage);
    const variation = useSelector(getSelectedVariation);

    // const content = selectedPage.staging[variation];
    const [content, setContent] = React.useState(selectedPage.staging[variation]);

    const [dragging, setDragging] = React.useState(false);

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

    const handleGridUpdate = (
        srcRow: number,
        destRow: number,
        srcCol: number,
        destCol: number,
        srcIndex: number,
        destIndex: number
    ) => {
        const [updatedRow1, updatedRow2] = getUpdatedRows(
            content,
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

    const deleteComponent = (srcRow: number, srcCol: number, srcIndex: number) => {
        setContent({
            ...content,
            rows: content.rows.map((row, rowIndex) => ({
                ...row,
                columns: row.columns.map((col, colIndex) => ({
                    ...col,
                    children: col.children.map((child, childIndex) =>
                        rowIndex === srcRow && colIndex === srcCol && childIndex === srcIndex
                        ? null
                        : child
                    ).filter(c => !!c)
                }))
            }))
        });
    };

    const onDragEnd = (result: DropResult) => {
        setDragging(false);

        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const [srcRow, srcCol] = source.droppableId.split('-').map(i => parseInt(i, 10));
        const srcIndex = source.index;

        if (destination.droppableId === 'trash') {
            deleteComponent(srcRow, srcCol, srcIndex);
            return;
        }

        const [destRow, destCol] = destination.droppableId.split('-').map(i => parseInt(i, 10));
        const destIndex = destination.index;

        if (srcRow === destRow) {
            if (srcCol === destCol) {
                reorderColumn(srcRow, srcCol, srcIndex, destIndex);
            } else {
                moveBetweenColumns(srcRow, srcCol, destCol, srcIndex, destIndex);
            }
        } else {
            handleGridUpdate(srcRow, destRow, srcCol, destCol, srcIndex, destIndex);
        }
    };

    return (
        <div className={classes.root}>
            <DragDropContext
                onDragStart={() => setDragging(true)}
                onDragEnd={onDragEnd}
            >
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
                <div className={classes.rowActions}>
                    <AddRowButton
                        onAddRow={handleAddRow}
                    />
                </div>

                <ComponentTrash
                    droppableId="trash"
                    dragging={dragging}
                />

            </DragDropContext>
        </div>
    );
};
