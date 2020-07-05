import { ColumnSpan, IPageRow } from '@common';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';

import { EditableColumn } from './EditableColumn';

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        width: '100%'
    },
    rowHovered: {
        boxShadow: `0px 0px 5px 0px ${theme.palette.action.selected}`
    },
    resizeHover: {
        cursor: 'ew-resize'
    }
}));

export interface IEditableRowProps {
    row: IPageRow;
    onUpdate: (row: IPageRow) => void;
}

export const EditableRow: React.FC<IEditableRowProps> = ({
    row,
    onUpdate
}) => {
    const classes = useStyles();

    const ref = React.useRef<HTMLDivElement>();

    const [hovered, setHovered] = React.useState(false);
    const [resizeHover, setResizeHover] = React.useState(-1);
    const [resizing, setResizing] = React.useState(false);

    const handleHover = (hovering: boolean) => {
        setHovered(hovering);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const boundingRect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.x;

        if (!resizing) {
            let totalWidth = 0;
            row.columns.forEach((col, colIndex) => {
                const colWidth = (col.span / 12) * boundingRect.width;

                if (offsetX >= totalWidth && offsetX < totalWidth + colWidth) {
                    const draggable = colIndex < row.columns.length - 1 && offsetX >= totalWidth + colWidth - 5;

                    if (draggable) {
                        if (resizeHover < 0) {
                            setResizeHover(colIndex);
                        }
                    } else {
                        if (resizeHover >= 0) {
                            setResizeHover(-1);
                        }
                    }
                }

                totalWidth += colWidth;
            });
        } else {
            const spanOfColumnsOnLeft = resizeHover === 0
                ? 0
                : row.columns.slice(0, resizeHover).reduce((span, col) => span + col.span, 0);

            const newSpan = Math.round((offsetX / boundingRect.width) * 12) - spanOfColumnsOnLeft;

            if (row.columns[resizeHover].span !== newSpan) {
                const diff = newSpan - row.columns[resizeHover].span;

                onUpdate({
                    ...row,
                    columns: row.columns.map((col, colIndex) =>
                        colIndex === resizeHover
                            ? { ...col, span: newSpan as ColumnSpan }
                            : (
                                colIndex === resizeHover + 1
                                ? { ...col, span: (col.span - diff) as ColumnSpan }
                                : { ...col }
                            )
                    )
                });
            }
        }
    };

    const handleMouseDown = () => {
        setResizing(resizeHover >= 0);
    };

    const handleMouseUp = () => {
        setResizing(false);
    };

    return (
        <div
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div
                ref={ref}
                className={cx(classes.row, {
                    [classes.rowHovered]: hovered,
                    [classes.resizeHover]: resizeHover >= 0
                })}

                onMouseMove={handleMouseMove}
            >
                {
                    row.columns.map((col, colIndex) => (
                        <EditableColumn
                            key={`col-${colIndex}`}
                            column={col}
                            highlight={hovered && colIndex > 0}
                        />
                    ))
                }
            </div>
        </div>
    );
};
