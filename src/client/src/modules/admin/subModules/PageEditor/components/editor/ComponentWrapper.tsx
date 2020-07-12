import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { selectComponent } from '../../actions';

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
    const dispatch = useDispatch();

    return (
        <Draggable draggableId={path.join('-')} index={index}>
        {
            provided => (
                <div
                    className={classes.root}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children}

                    <div
                        className={classes.overlay}
                        onClick={() => dispatch(selectComponent(path))}
                    />
                </div>
            )
        }
        </Draggable>
    );
};
