import { createSlice } from '@reduxjs/toolkit';


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
    },
    reducers: {
        addToFavorites: (state, action) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter((id) => id !== action.payload);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;