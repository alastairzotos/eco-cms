import { IPage } from '@common*';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SortableTree, {
    FullTree,
    NodeData,
    OnMovePreviousAndNextLocation,
    TreeItem
} from 'react-sortable-tree';
import TreeTheme from 'react-sortable-tree-theme-minimal';
import { Spacer } from '~/atomic/atoms/Spacer';
import { pagesToTree } from '~/core';

import { beginSavePage } from '../../PageEditor/actions';
import { getPages } from '../../PageEditor/selectors';

import { NavigationItemCheckbox } from './NavigationItemCheckbox';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(2)
    }
}));

interface INavigationTreeItem extends TreeItem {
    page: IPage;
}

export const pagesToTreeItems = (pages: IPage[], parent?: IPage): INavigationTreeItem[] =>
    pagesToTree<INavigationTreeItem>(
        pages,
        {
            populate: page => ({
                expanded: true,
                title: page.title
            })
        }
    );

export const NavigationEditor: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);

    const [treeItems, setTreeItems] = React.useState(pagesToTreeItems(pages));

    React.useEffect(() => {
        setTreeItems(pagesToTreeItems(pages));
    }, [pages]);

    const handleMoveNode = (data: NodeData & FullTree & OnMovePreviousAndNextLocation) => {
        const page = (data.node as any).page as IPage;
        const parent = (data.nextParentNode ? (data.nextParentNode as any).page : null) as IPage;

        dispatch(beginSavePage({
            ...page,
            navigation: {
                ...page.navigation,
                parentPage: parent
            }
        }));
    };

    const handleTreeChange = (items: TreeItem[]) => {
        setTreeItems(items as INavigationTreeItem[]);
    };

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">Navigation</Typography>
            <Spacer top={2} />
            <SortableTree
                treeData={treeItems}
                onChange={handleTreeChange}
                onMoveNode={handleMoveNode}
                theme={TreeTheme}

                generateNodeProps={data => ({
                    buttons: [<NavigationItemCheckbox data={data} />],
                })}
            />
        </Paper>
    );
};
