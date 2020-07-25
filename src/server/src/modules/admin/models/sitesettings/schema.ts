import { Schema } from 'mongoose';

import { pageSchema } from '../pages/schema';

export const navigationItemSchema = new Schema();
navigationItemSchema.add({
    pageId: pageSchema,
    parent: navigationItemSchema
});

export const siteSettingsSchema = new Schema({
    selectedTheme: {
        moduleId: String,
        themeName: String
    },
    navigationItems: [navigationItemSchema]
});
