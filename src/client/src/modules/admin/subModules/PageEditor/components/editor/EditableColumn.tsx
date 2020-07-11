import { IPageColumn } from '@common';
import { Grid, makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { renderComponent } from '~/modules/pages/utils';

import { AddComponentButton } from './AddComponentButton';

export interface IEditableColumnProps {
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
        // display: 'flex',
        // flex: 1,
        // height: '100%',
        // flexDirection: 'column',
        // alignItems: 'flex-end'
    }
}));

export const EditableColumn: React.FC<IEditableColumnProps> = ({
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
        <>
            <Grid
                item
                lg={column.span}
                className={cx(classes.root, {
                    [classes.highlight]: highlight
                })}

                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <div>
                {
                   column.children.map(child => renderComponent(child))
                }
                </div>

                {hovering && !resizing && (
                    <div className={classes.addCompContainer}>
                        <AddComponentButton
                            column={column}
                            onAddComponent={handleAddComponent}
                        />
                    </div>
                )}
            </Grid>
        </>
    );
};
