import { JSONSchema7 } from 'json-schema';
import * as React from 'react';

export interface IComponentInfo {
    schema?: JSONSchema7;
    component: React.FC<any>;
}

export const createComponent = <T>(component: React.FC<T>, schema?: JSONSchema7): IComponentInfo => ({
    component,
    schema
});
