import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetch',
  async ({ type, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/recipes/${type}?page=${page}`);
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response.data);
    }
  }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        items: [],
        page: 1,
        hasMore: true,
        loading: false,
        error: null,
    },
    reducers: {
      clearRecipes: (state) => {
        state.items = [];
        state.page = 1;
        state.hasMore = true;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                const { recipes, hasMore } = action.payload;
                if (state.page === 1) {
                  state.items = recipes;
                } else {
                  state.items.push(...recipes);
                }
                state.page += 1;
                state.hasMore = hasMore;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;

