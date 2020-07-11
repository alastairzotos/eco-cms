import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface IComponentWrapperProps {
    path: number[];
    index: number;
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
}));

export const ComponentWrapper: React.FC<IComponentWrapperProps> = ({
    path,
    index,
    children
}) => {
    const classes = useStyles();

    return (
        <Draggable draggableId={path.join('-')} index={index}>
        {
            provided => (
                <div
                    className={classes.root}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ margin: 10, ...provided.draggableProps.style }}
                >
                    <div style={{ margin: -10 }}>
                        {children}
                    </div>

                    <div className={classes.overlay} />
                </div>
            )
        }
        </Draggable>
    );
};
