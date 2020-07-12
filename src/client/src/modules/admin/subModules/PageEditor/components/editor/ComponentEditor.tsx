import { Drawer, makeStyles } from '@material-ui/core';
import * as JSONSchemaForm from '@rjsf/material-ui';
import cx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moduleManager } from '~/core';

import { deselectComponent, setSelectedPageContent } from '../../actions';
import {
    getSelectedComponent,
    getSelectedPage,
    getSelectedVariation
} from '../../selectors';

const Form = JSONSchemaForm.default;

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        padding: 10,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    }
}));

export const ComponentEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const selectedComponent = useSelector(getSelectedComponent);
    const selectedPage = useSelector(getSelectedPage);
    const variation = useSelector(getSelectedVariation);

    if (!selectedPage) {
        return <></>;
    }

    const drawerOpen = !!selectedComponent;

    const content = selectedPage.staging[variation];

    const component = !!selectedComponent
        ? content
            .rows[selectedComponent[0]]
            .columns[selectedComponent[1]]
            .children[selectedComponent[2]]
        : null;

    const componentInfo = component
        ? moduleManager.moduleMap[component.type[0]].components[component.type[1]]
        : null;

    const updateProperties = (data: any) => {
        dispatch(setSelectedPageContent({
            rows: content.rows.map((row, rowIndex) => ({
                ...row,
                columns: row.columns.map((column, columnIndex) => ({
                    ...column,
                    children: column.children.map((child, childIndex) => ({
                        ...child,
                        props: rowIndex === selectedComponent[0]
                            && columnIndex === selectedComponent[1]
                            && childIndex === selectedComponent[2]
                            ? data
                            : child.props
                    }))
                }))
            }))
        }));
    };

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => dispatch(deselectComponent())}
            className={cx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen
            })}
            classes={{
                paper: cx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen
                })
            }}
        >
        {
            component && componentInfo.schema && (
                <Form
                    schema={componentInfo.schema}
                    onChange={e => updateProperties(e.formData)}
                    formData={component.props}

                    onSubmit={() => dispatch(deselectComponent())}
                />
            )
        }
        </Drawer>
    );
};
