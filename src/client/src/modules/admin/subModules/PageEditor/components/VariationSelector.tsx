import { IPage } from '@common';
import {
    Button,
    ButtonGroup,
    DialogContentText,
    FormControl,
    FormLabel,
    makeStyles
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Left from '@material-ui/icons/ChevronLeft';
import Right from '@material-ui/icons/ChevronRight';
import Remove from '@material-ui/icons/Delete';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Confirm } from '~/atomic/molecules/Confirm';

import { addPageVariation, deletePageVariation, setPageVariation } from '../actions';
import { getSelectedVariation } from '../selectors';

export interface IVersionSelectorProps {
    page: IPage;
    showAddRemoveButtons?: boolean;
}

const useStyles = makeStyles(theme => ({
    label: {
        fontSize: 12
    },
    variationSelector: {
        minWidth: 200,
        display: 'inline-block',
    }
}));

export const VariationSelector: React.FC<IVersionSelectorProps> = ({
    page,
    showAddRemoveButtons = true,
}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selected = useSelector(getSelectedVariation);

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    const handleAddVariation = () => {
        dispatch(addPageVariation(page));
    };

    const handleDeleteVariation = () => {
        setConfirmDeleteOpen(false);
        dispatch(deletePageVariation(page, selected));
    };

    return (
        <>
            <FormControl className={classes.variationSelector}>
                <FormLabel className={classes.label}>Vn. {selected + 1}</FormLabel>
                <ButtonGroup size="small" disableElevation variant="text">
                    <Button
                        size="small"
                        disabled={selected === 0}
                        onClick={() => dispatch(setPageVariation(selected - 1))}
                    >
                        <Left fontSize="small" />
                    </Button>
                    <Button
                        size="small"
                        disabled={selected === page.staging.length - 1}
                        onClick={() => dispatch(setPageVariation(selected + 1))}
                    >
                        <Right fontSize="small" />
                    </Button>
                </ButtonGroup>
                {showAddRemoveButtons && (
                    <ButtonGroup size="small" disableElevation>
                        <Button
                            size="small"
                            onClick={handleAddVariation}
                        >
                            <Add fontSize="small" />
                        </Button>

                        {page.staging.length > 1 && (
                            <Button
                                size="small"
                                onClick={() => setConfirmDeleteOpen(true)}
                            >
                                <Remove fontSize="small" />
                            </Button>
                        )}
                    </ButtonGroup>
                )}
            </FormControl>

            <Confirm
                title="Delete variation"
                open={confirmDeleteOpen}
                onCancel={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteVariation}
            >
                <DialogContentText>Are you sure you want to delete this variation?</DialogContentText>
            </Confirm>
        </>
    );
};