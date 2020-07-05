import { ColumnSpan, IPageRow } from '@common';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';

import { EditableColumn } from './EditableColumn';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    highlight: {
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
    const [hoveredColumnForResizing, setHoveredColumnForResizing] = React.useState(-1);
    const [resizing, setResizing] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const boundingRect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - boundingRect.x;

        if (!resizing) {
            let totalWidth = 0;
            row.columns.forEach((col, colIndex) => {
                const colWidth = (col.span / 12) * boundingRect.width;
                const mouseIsOverColumn = offsetX >= totalWidth && offsetX < totalWidth + colWidth;

                if (mouseIsOverColumn) {
                    const canDrag = colIndex < row.columns.length - 1 && offsetX >= totalWidth + colWidth - 5;

                    if (canDrag) {
                        if (hoveredColumnForResizing < 0) {
                            setHoveredColumnForResizing(colIndex);
                        }
                    } else {
                        if (hoveredColumnForResizing >= 0) {
                            setHoveredColumnForResizing(-1);
                        }
                    }
                }

                totalWidth += colWidth;
            });
        } else {
            const spanOfColumnsOnLeft = hoveredColumnForResizing === 0
                ? 0
                : row.columns.slice(0, hoveredColumnForResizing).reduce((span, col) => span + col.span, 0);

            const newSpan = (Math.round((offsetX / boundingRect.width) * 12) - spanOfColumnsOnLeft) || 1;

            if (row.columns[hoveredColumnForResizing].span !== newSpan) {
                const diff = newSpan - row.columns[hoveredColumnForResizing].span;

                onUpdate({
                    ...row,
                    columns: row.columns.map((col, colIndex) =>
                        colIndex === hoveredColumnForResizing
                            ? { ...col, span: newSpan as ColumnSpan }
                            : (
                                colIndex === hoveredColumnForResizing + 1
                                    ? { ...col, span: (col.span - diff) as ColumnSpan }
                                    : { ...col }
                            )
                    )
                });
            }
        }
    };

    return (
        <div
            ref={ref}
            className={cx(classes.root, {
                [classes.highlight]: hovered || resizing,
                [classes.resizeHover]: hoveredColumnForResizing >= 0 || resizing
            })}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => setResizing(hoveredColumnForResizing >= 0)}
            onMouseUp={() => setResizing(false)}
            onMouseMove={handleMouseMove}
        >
            {
                row.columns.map((col, colIndex) => (
                    <EditableColumn
                        key={`col-${colIndex}`}
                        column={col}
                        highlight={hovered && colIndex > 0 || resizing}
                    />
                ))
            }
        </div>
    );
};
