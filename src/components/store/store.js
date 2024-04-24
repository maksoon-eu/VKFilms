import { configureStore } from '@reduxjs/toolkit';
import films from '../components/catalog/catalogSlice';
import sameFilms from '../components/sameSlider/sameSliderSlice';
import film from '../components/chooseItem/chooseItemSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {films, sameFilms, film},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;