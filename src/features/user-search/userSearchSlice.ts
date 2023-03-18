import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserSearchsState {
    value: string;
}

const initialState: UserSearchsState = {
    value: '',
};

export const userSearchSlice = createSlice({
    name: 'userSearch',
    initialState,
    reducers: {
        updateSearchValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { updateSearchValue } = userSearchSlice.actions;

export default userSearchSlice.reducer;
