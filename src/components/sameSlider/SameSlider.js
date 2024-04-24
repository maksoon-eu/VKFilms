import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSameFilms, selectAll } from "./sameSliderSlice";
import { v4 as uuidv4 } from 'uuid';

import store from '../../store';

import './sameSlider.scss';

const SameSlider = () => {
    const { sameFilmsLoadingStatus } = useSelector(state => state.sameFilms);
    const sameFilms = selectAll(store.getState());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSameFilms());
    }, [])

    return (
        <div>SameSlider</div>
    )
}

export default SameSlider;