import { Container, TextField } from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '~/atomic/atoms/Panel';
import { Spacer } from '~/atomic/atoms/Spacer';
import SplitPanel from '~/atomic/atoms/SplitPanel';

import { setPageData } from '../actions';
import { getSelectedPage } from '../selectors';

import { PageSettings } from './settings/PageSettings';

export const PageContentEditor: React.FC = () => {
    const dispatch = useDispatch();
    const selectedPage = useSelector(getSelectedPage);

    const setTitle = (title: string) => {
        dispatch(setPageData({
            ...selectedPage,
            title
        }));
    };

    const setContent = (content: string) => {
        dispatch(setPageData({
            ...selectedPage,
            content
        }));
    };

    if (!selectedPage) {
        return <></>;
    }

    return (
        <SplitPanel id="page" split="vertical" primary="second" minSplit={250}>
            <Panel>
                <Container maxWidth="md">
                    <Spacer top={2} />

                    <TextField
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={selectedPage.title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Spacer top={2} />

                    <TextField
                        label="Content"
                        multiline
                        fullWidth
                        rows={20}
                        variant="outlined"
                        value={selectedPage.content}
                        onChange={e => setContent(e.target.value)}
                    />
                </Container>
            </Panel>
            <Panel>
                <PageSettings />
            </Panel>
        </SplitPanel>
    );
};
