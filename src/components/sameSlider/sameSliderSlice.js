import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const sameFilmsAdapter = createEntityAdapter();

const initialState = sameFilmsAdapter.getInitialState({
    sameFilmsLoadingStatus: 'idle',
    totalCount: 0
});

export const fetchSameFilms = createAsyncThunk(
    'sameFilms/fetchSameFilms',
    async (id) => {
        const {request} = useHttp();
        return await request(`${process.env.REACT_APP_URL}/movie/${id}/similar?language=${process.env.REACT_APP_LANG}&page=1`);
    }
);

const sameFilmsSlice = createSlice({
    name: 'sameFilms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSameFilms.pending, state => {
                state.sameFilmsLoadingStatus = 'loading';
            })
            .addCase(fetchSameFilms.fulfilled, (state, action) => {
                sameFilmsAdapter.setAll(state, action.payload.results);

                state.totalCount = action.payload.length
                state.sameFilmsLoadingStatus = 'idle';
            })
            .addCase(fetchSameFilms.rejected, state => {
                state.sameFilmsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = sameFilmsSlice;

export default reducer;

export const {selectAll} = sameFilmsAdapter.getSelectors(state => state.sameFilms);

export const {
    sameFilmsFetching,
    sameFilmsFetched,
    sameFilmsFetchingError
} = actions;