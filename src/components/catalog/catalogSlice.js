import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filmsAdapter = createEntityAdapter();

const initialState = filmsAdapter.getInitialState({
    filmsLoadingStatus: 'idle',
    totalCount: 0,
    page: 0
});

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    async (arg, { getState }) => {
        const state = getState();

        const {request} = useHttp();
        return await request(`${process.env.REACT_APP_URL}/movie/popular?language=${process.env.REACT_APP_LANG}&page=${state.films.page}`);
    }
);

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, state => {
                state.page++;

                if (state.page === 1) {
                    state.filmsLoadingStatus = 'loading' 
                } else {
                    state.filmsLoadingStatus = 'updateLoading';
                }
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                filmsAdapter.setMany(state, action.payload.results);

                state.filmsLoadingStatus = 'idle';
                state.totalCount = action.payload.results.length;
            })
            .addCase(fetchFilms.rejected, state => {
                state.filmsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filmsSlice;

export default reducer;

export const {selectAll} = filmsAdapter.getSelectors(state => state.films);

export const {
    filmsFetching,
    filmsFetched,
    filmsFetchingError
} = actions;