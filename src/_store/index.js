import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer,createCardReducer } from './users.slice';

export * from './auth.slice';
export * from './users.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cards: usersReducer,
        createCardResponse:createCardReducer,
    },
});