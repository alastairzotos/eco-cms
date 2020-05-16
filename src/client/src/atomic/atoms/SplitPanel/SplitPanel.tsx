import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import SplitPane from 'react-split-pane';
import { getDefaultSplitPanelSize, getMinSplitPanelSize, ISplitDirection, setSplitPanelSize } from '~/core/utils';

import './styles/resizer.css';

export interface ISplitPanelProps {
    id: string;
    split: ISplitDirection;
    primary?: 'first' | 'second';
    minSplit?: number;
    maxSplit?: number;
    defaultSplit?: number;
}

const useStyles = makeStyles(theme => ({
    main: {
        height: '100%',
        width: '100%',
        maxWidth: '100%'
    }
}));

export const SplitPanel: React.FC<ISplitPanelProps> = ({
    id,
    split,
    primary = 'first',
    minSplit,
    maxSplit,
    defaultSplit,
    children
}) => {
    const classes = useStyles();

    return (
        <div className={classes.main}>
            <SplitPane
                split={split}
                minSize={minSplit !== undefined ? minSplit : getMinSplitPanelSize(split)}
                maxSize={maxSplit}
                defaultSize={defaultSplit !== undefined ? defaultSplit : getDefaultSplitPanelSize(id, split)}
                onChange={setSplitPanelSize(id, split)}
                style={{ position: 'relative' }}
                primary={primary}
            >
                {children}
            </SplitPane>
        </div>
    );
};
