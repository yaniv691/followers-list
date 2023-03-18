import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import userSearchReducer from '../features/user-search/userSearchSlice';
import { githubApi } from '../services/github-api';

export const store = configureStore({
    reducer: {
        userSearch: userSearchReducer,
        [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
