import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserSearchsState {
    value: string | undefined;
}

const initialState: UserSearchsState = {
    value: undefined,
};

export const userSearchSlice = createSlice({
    name: 'userSearch',
    initialState,
    reducers: {
        updateSearchValue: (
            state,
            action: PayloadAction<string | undefined>
        ) => {
            state.value = action.payload;
        },
    },
});

export const { updateSearchValue } = userSearchSlice.actions;

export default userSearchSlice.reducer;
