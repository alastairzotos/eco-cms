import { IPage } from '@common';
import {
    DialogContentText,
    FormControl,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem,
    Select
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Delete';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Confirm } from '~/atomic/molecules/Confirm';
import { addPageVersion, deletePageVersion, setPageVersion } from '~/modules/admin/actions';
import { getSelectedVersion } from '~/modules/admin/selectors/pages';

export interface IVersionSelectorProps {
    page: IPage;
    showAddRemoveButtons?: boolean;
}

const useStyles = makeStyles(theme => ({
    versionSelector: {
        minWidth: 200,
        display: 'inline-block'
    },
    versionSelectorDropdown: {
        width: 150
    }
}));

export const VersionSelector: React.FC<IVersionSelectorProps> = ({
    page,
    showAddRemoveButtons = true,
}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const selected = useSelector(getSelectedVersion);

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

    const handleAddVersion = () => {
        dispatch(addPageVersion(page));
    };

    const handleDeleteVersion = () => {
        setConfirmDeleteOpen(false);
        dispatch(deletePageVersion(page, selected));
    };

    return (
        <>
            <FormControl className={classes.versionSelector}>
                <InputLabel id="version-label">Version</InputLabel>
                <Select
                    className={classes.versionSelectorDropdown}
                    labelId="version-label"
                    value={selected}
                    onChange={(event: React.ChangeEvent<{ value: number }>) =>
                        dispatch(setPageVersion(event.target.value))
                    }
                >
                    {
                        Array.from(Array(page.staging.length).keys()).map(vn =>
                            <MenuItem key={vn} value={vn}>{vn + 1}</MenuItem>
                        )
                    }
                </Select>
                {showAddRemoveButtons && (
                    <>
                        <IconButton
                            size="small"
                            onClick={handleAddVersion}
                        >
                            <Add />
                        </IconButton>

                        {page.staging.length > 1 && (
                            <IconButton
                                size="small"
                                onClick={() => setConfirmDeleteOpen(true)}
                            >
                                <Remove />
                            </IconButton>
                        )}
                    </>
                )}
            </FormControl>

            <Confirm
                title="Delete version"
                open={confirmDeleteOpen}
                onCancel={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteVersion}
            >
                <DialogContentText>Are you sure you want to delete this version?</DialogContentText>
            </Confirm>
        </>
    );
};
