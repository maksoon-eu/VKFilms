import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilm, selectAll } from "./chooseItemSlice";
import { v4 as uuidv4 } from 'uuid';

import store from '../../store';

import './chooseItem.scss';

const ChooseItem = () => {
    const { itemLoadingStatus } = useSelector(state => state.item);
    const item = selectAll(store.getState());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilm());
    }, [])

    return (
        <div>ChooseItem</div>
    )
}

export default ChooseItem;