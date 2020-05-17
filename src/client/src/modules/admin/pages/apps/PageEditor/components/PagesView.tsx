import { List, ListItem } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from '~/modules/admin/actions';
import { getPages } from '~/modules/admin/selectors/pages';

export const PagesView: React.FC = () => {
    const dispatch = useDispatch();
    const pages = useSelector(getPages);

    return (
        <List>
        {
            pages.map(page => (
                <ListItem
                    key={page._id}
                    button
                    onClick={() => dispatch(selectCurrentPage(page._id))}
                >
                    {page.title}
                </ListItem>
            ))
        }
        </List>
    );
};
