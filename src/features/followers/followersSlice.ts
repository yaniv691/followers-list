import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface followerssState {
    totalPages: number | undefined;
}

const initialState: followerssState = {
    totalPages: undefined,
};

export const followersSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {
        updateTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    },
});

export const { updateTotalPages } = followersSlice.actions;

export default followersSlice.reducer;
