import { Fab, makeStyles } from '@material-ui/core';
import Trash from '@material-ui/icons/Delete';
import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 30
    }
}));

export interface IComponentTrashProps {
    droppableId: string;
    dragging: boolean;
}

export const ComponentTrash: React.FC<IComponentTrashProps> = ({
    droppableId,
    dragging
}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
        >
            <Droppable droppableId={droppableId}>
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {dragging && (
                                <Fab color={ snapshot.isDraggingOver ? 'primary' : 'default' }>
                                    <Trash />
                                </Fab>
                            )}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
};
