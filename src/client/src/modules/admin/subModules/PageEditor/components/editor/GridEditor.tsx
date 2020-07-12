import { ColumnSpan, IPageComponent, IPageContent, IPageRow } from '@common';
import { Container, makeStyles, Paper } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPageContent } from '../../actions';
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

const getComponentByPath = (
    content: IPageContent,
    path: number[]
): IPageComponent =>
    content
        .rows[path[0]]
        .columns[path[1]]
        .children[path[2]];

const removeFromContent = (
    content: IPageContent,
    path: number[]
): IPageContent => ({
    ...content,
    rows: content.rows.map((row, rowIndex) => ({
        ...row,
        columns: row.columns.map((column, columnIndex) => ({
            ...column,
            children: column.children.map((child, childIndex) => (
                rowIndex === path[0]
                    && columnIndex === path[1]
                    && childIndex === path[2]
                    ? null
                    : child
            )).filter(child => !!child)
        }))
    }))
});

const addToContent = (
    content: IPageContent,
    path: number[],
    component: IPageComponent
): IPageContent => ({
    ...content,
    rows: content.rows.map((row, rowIndex) => ({
        ...row,
        columns: row.columns.map((column, columnIndex) => ({
            ...column,
            children: (
                rowIndex === path[0] && columnIndex === path[1]
                    ? [
                        ...column.children.splice(0, path[2]),
                        component,
                        ...column.children.splice(path[2])
                    ]
                    : column.children
            )
        }))
    }))
});

export const GridEditor: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectedPage = useSelector(getSelectedPage);
    const variation = useSelector(getSelectedVariation);

    const content = selectedPage.staging[variation];

    const [dragging, setDragging] = React.useState(false);

    const setContent = (pageContent: IPageContent) =>
        dispatch(setSelectedPageContent(pageContent));

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

    const onDragEnd = (result: DropResult) => {
        setDragging(false);

        if (!result.destination) {
            return;
        }

        const sourcePath = [
            ...result.source.droppableId.split('-').map(i => parseInt(i, 10)),
            result.source.index
        ];

        const destPath = [
            ...result.destination.droppableId.split('-').map(i => parseInt(i, 10)),
            result.destination.index
        ];

        if (result.destination.droppableId === 'trash') {
            setContent(removeFromContent(content, sourcePath));
            return;
        }

        setContent(
            addToContent(
                removeFromContent(content, sourcePath),
                destPath,
                getComponentByPath(content, sourcePath)
            )
        );
    };

    return (
        <Container maxWidth="xl">
            <Paper>
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
            </Paper>
        </Container>
    );
};
