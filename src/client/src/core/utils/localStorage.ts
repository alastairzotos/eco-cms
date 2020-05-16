export const localStorageNames = {
    editor: {
        theme: 'editor_theme',
        sidePanel: {
            splitH: 'editor_side_panel_split_h',
            splitV: 'editor_side_panel_split_v',
        },

        panel: {
            split: (id: string) => `editor_panel_split_${id}`
        }
    }
};
