import { IPageColumn } from '@common';
import { Grid, makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { renderComponent } from '~/modules/pages/utils';

import { AddComponentButton } from './AddComponentButton';
import { ComponentWrapper } from './ComponentWrapper';

export interface IEditableColumnProps {
    path: number[];
    column: IPageColumn;
    highlight: boolean;
    resizing: boolean;
    onUpdate: (column: IPageColumn) => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 40,
    },
    highlight: {
        boxShadow: `-5px 0px 0px 0px ${theme.palette.action.selected}`
    },
    addCompContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    droppable: {
        height: '100%'
    },
    droppableHover: {
        backgroundColor: theme.palette.action.focus
    }
}));

export const EditableColumn: React.FC<IEditableColumnProps> = ({
    path,
    column,
    highlight,
    resizing,
    onUpdate
}) => {
    const classes = useStyles();

    const [hovering, setHovering] = React.useState(false);

    const handleAddComponent = (type: [string, string]) => {
        onUpdate({
            ...column,
            children: [
                ...column.children,
                {
                    type,
                    order: column.children.length,
                    props: {}
                }
            ]
        });
    };

    return (
        <Droppable droppableId={path.join('-')}>
            {
                (provided, snapshot) => (
                    <Grid
                        ref={provided.innerRef}
                        item
                        lg={column.span}
                        className={cx(classes.root, {
                            [classes.highlight]: highlight,
                            [classes.droppableHover]: snapshot.isDraggingOver
                        })}

                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}

                        {...provided.droppableProps}
                    >
                        {
                            column.children
                                .map(child => renderComponent(child))
                                .map((comp, i) => (
                                    <ComponentWrapper
                                        key={i}
                                        index={i}
                                        path={[...path, i]}
                                    >
                                        {comp}
                                    </ComponentWrapper>
                                ))
                        }

                        {hovering && !resizing && (
                            <div className={classes.addCompContainer}>
                                <AddComponentButton
                                    column={column}
                                    onAddComponent={handleAddComponent}
                                />
                            </div>
                        )}
                    </Grid>
                )
            }
        </Droppable>
    );
};
