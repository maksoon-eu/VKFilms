import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, selectAll } from "./catalogSlice";

import store from "../../store/store";

import CatalogItem from "../catalogItem/CatalogItem";
import SkeletonItem from "../skeleton/SkeletonItem";

import './catalog.scss';

const Catalog = () => {
    const { filmsLoadingStatus, totalCount } = useSelector(state => state.films);
    const films = selectAll(store.getState());

    const dispatch = useDispatch();

    const skeletonArr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    useEffect(() => {
        if (!totalCount) {
            dispatch(fetchFilms());
        }
    }, [])

    const filmList = films.map(item => {
        return <CatalogItem item={item} key={item.id} />
    });

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonItem key={i}/>
        )
    })

    return (
        <div className="catalog__minHeight">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                    key={filmsLoadingStatus === 'loading'}
                    className="catalog"
                >
                    {filmsLoadingStatus === 'loading' ? skeletonList : totalCount === 0 ? <h1 className="nothing">Nothing found</h1> : filmList}
                </motion.div>
            </AnimatePresence>

            {totalCount % 20 === 0 && totalCount !== 0 &&
                <motion.div 
                    className="load__more"
                    whileHover={{ scale: 1.05, translateY: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(fetchFilms())}
                >{filmsLoadingStatus === 'loading' || filmsLoadingStatus === 'updateLoading'  ? <span className="loader"></span> : 'Загрузить Еще'}</motion.div>
            }
        </div>
    )
}

export default Catalog;