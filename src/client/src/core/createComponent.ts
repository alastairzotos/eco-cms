import * as React from 'react';
import toJsonSchema from 'to-json-schema';

export interface IComponentType {
    schema: toJsonSchema.JSONSchema3or4;
    component: React.FC<any>;
}

export const createComponent = <T extends object>(component: React.FC<T>, defaults?: T): IComponentType => ({
    schema: toJsonSchema(defaults || {}, {
        required: true,
        objects: {
            additionalProperties: true
        }
    }),
    component: props => component({ ...(defaults || {}), ...props })
});
