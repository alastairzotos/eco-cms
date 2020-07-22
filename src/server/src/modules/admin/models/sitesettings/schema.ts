import { Schema } from 'mongoose';

import { page2Schema } from '../pages2/schema';

export const navigationItemSchema = new Schema();
navigationItemSchema.add({
    pageId: page2Schema,
    parent: navigationItemSchema
});

export const siteSettingsSchema = new Schema({
    selectedTheme: {
        moduleId: String,
        themeName: String
    },
    navigationItems: [navigationItemSchema]
});
