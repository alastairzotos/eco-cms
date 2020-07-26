import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moduleManager } from '~/core';

import { beginUpdateSettings } from '../actions';
import { getSiteSettings, getSiteSettingsLoadStatus, getSiteSettingsUpdateStatus } from '../selectors';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export const ThemeSelector: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const getSettingsStatus = useSelector(getSiteSettingsLoadStatus);
    const updateSettingsStatus = useSelector(getSiteSettingsUpdateStatus);
    const siteSettings = useSelector(getSiteSettings);

    const modules = moduleManager.modules.filter(mod => mod.themes && mod.themes.length > 0);
    const moduleMap = moduleManager.moduleMap;

    const [selectedModule, setSelectedModule] = React.useState(siteSettings ? siteSettings.selectedTheme.moduleId : '');
    const [selectedTheme, setSelectedTheme] = React.useState(siteSettings ? siteSettings.selectedTheme.themeName : '');

    if (!siteSettings || getSettingsStatus === 'fetching') {
        return <></>;
    }

    const handleActivateClick = () => {
        dispatch(beginUpdateSettings({
            ...siteSettings,
            selectedTheme: {
                moduleId: selectedModule,
                themeName: selectedTheme
            }
        }));
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Select Theme</Typography>

            <FormControl className={classes.formControl}>
                <InputLabel id="module-selector">Module</InputLabel>
                <Select
                    labelId="module-selector"
                    value={selectedModule}
                    onChange={(e: React.ChangeEvent<{ value: any }>) => setSelectedModule(e.target.value)}
                >
                {
                    modules.map(mod => (
                        <MenuItem key={mod.name} value={mod.name}>{mod.name}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>

            {selectedModule !== '' && (
                <FormControl className={classes.formControl}>
                    <InputLabel id="theme-selector">Theme</InputLabel>
                    <Select
                        labelId="theme-selector"
                        value={selectedTheme}
                        onChange={(e: React.ChangeEvent<{ value: any }>) => setSelectedTheme(e.target.value)}
                    >
                    {
                        moduleMap[selectedModule].themes.map(theme => (
                            <MenuItem key={theme.name} value={theme.name}>{theme.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
            )}

            {selectedTheme !== '' && (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleActivateClick}
                    >
                    {
                        updateSettingsStatus === 'fetching'
                        ? (
                            <>
                                <CircularProgress size={12} />
                                Activating
                            </>
                        )
                        : (
                            updateSettingsStatus === 'success'
                            ? <>Activated</>
                            : (
                                updateSettingsStatus === 'error'
                                ? <>There was an error</>
                                : <>Activate</>
                            )
                        )
                    }
                    </Button>
                </div>
            )}
        </Paper>
    );
};
