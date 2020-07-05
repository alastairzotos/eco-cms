import { IPageColumn } from '@common';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';
import * as React from 'react';
import { renderComponent } from '~/modules/pages/utils';

export interface IEditableColumnProps {
    column: IPageColumn;
    highlight: boolean;
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 40
    },
    highlight: {
        boxShadow: `-5px 0px 0px 0px ${theme.palette.action.selected}`
    }
}));

const getColumnWidth = (col: IPageColumn) =>
    `${(col.span / 12) * 100}%`;

export const EditableColumn: React.FC<IEditableColumnProps> = ({ column, highlight }) => {
    const classes = useStyles();

    return (
        <>
            <div
                className={cx(classes.root, {
                    [classes.highlight]: highlight
                })}

                style={{ width: getColumnWidth(column) }}
            >
                {
                    column.children.map(child => renderComponent(child))
                }
            </div>
        </>
    );
};
