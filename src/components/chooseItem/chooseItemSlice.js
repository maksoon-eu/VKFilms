import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filmAdapter = createEntityAdapter();

const initialState = filmAdapter.getInitialState({
    filmLoadingStatus: 'idle',
    totalCount: 0
});

export const fetchFilm = createAsyncThunk(
    'film/fetchFilm',
    async (id) => {
        const {request} = useHttp();
        return await request(`${process.env.REACT_APP_URL}/movie/${id}?language=${process.env.REACT_APP_LANG}`);
    }
);

const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilm.pending, state => {
                state.filmLoadingStatus = 'loading';
            })
            .addCase(fetchFilm.fulfilled, (state, action) => {
                filmAdapter.setAll(state, [action.payload]);

                state.filmLoadingStatus = 'idle';
                state.totalCount = 1;
            })
            .addCase(fetchFilm.rejected, state => {
                state.filmLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filmSlice;

export default reducer;

export const {selectAll} = filmAdapter.getSelectors(state => state.film);

export const {
    filmFetching,
    filmFetched,
    filmFetchingError
} = actions;