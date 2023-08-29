import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction('auth/setUser');
export const clearUser = createAction('auth/clearUser');