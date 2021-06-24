import React from 'react';

export const setHookState = jest.fn();
export const useSetHookStateMock: any = (initState: any) => [initState, setHookState];
