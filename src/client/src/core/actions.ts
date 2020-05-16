export interface IAction<Type = any, Payload = any> {
    type: Type;
    payload?: Payload;
}

export const createAction = <Type = any, Payload = any>(type: Type, payload?: Payload) => ({
    type,
    payload
});
