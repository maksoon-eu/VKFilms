import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, selectAll } from "./catalogSlice";
import { v4 as uuidv4 } from 'uuid';

import store from '../../store';

import './catalog.scss';

const Catalog = () => {
    const { filmsLoadingStatus, totalCount } = useSelector(state => state.films);
    const films = selectAll(store.getState());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilms());
    }, [])

    return (
        <div>Catalog</div>
    )
}

export default Catalog;