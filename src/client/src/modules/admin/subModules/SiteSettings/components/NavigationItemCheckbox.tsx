import { IPage } from '@common*';
import { Checkbox } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ExtendedNodeData } from 'react-sortable-tree';

import { beginSavePage } from '../../PageEditor/actions';

export interface INavigationItemCheckboxProps {
    data: ExtendedNodeData;
}

export const NavigationItemCheckbox: React.FC<INavigationItemCheckboxProps> = ({ data }) => {
    const dispatch = useDispatch();

    const page = (data.node as any).page as IPage;

    const [selected, setSelected] = React.useState(page.navigation.selected);

    React.useEffect(() => {
        setSelected(page.navigation.selected);
    }, [page]);

    const handleChange = (checked: boolean) => {
        dispatch(beginSavePage({
            ...page,
            navigation: {
                ...page.navigation,
                selected: checked
            }
        }));

        setSelected(checked);
    };

    return (
        <Checkbox
            checked={selected}
            onChange={e => handleChange(e.target.checked)}
        />
    );
};
