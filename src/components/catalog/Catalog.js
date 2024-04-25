import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, selectAll } from "./catalogSlice";

import store from "../../store/store";

import CatalogItem from "../catalogItem/CatalogItem";

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
            <div className="skeleton__item skeleton--wave" key={i}/>
        )
    })

    const content = filmsLoadingStatus === 'loading' ? skeletonList : filmsLoadingStatus === 'error' ? <h1 className="nothing">Turn on VPN</h1> : totalCount === 0 ? <h1 className="nothing">Nothing found</h1> : filmList;
    const loadMore = filmsLoadingStatus === 'loading' || filmsLoadingStatus === 'updateLoading' ? <span className="loader"></span> : 'Загрузить Еще';
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
                    {content}
                </motion.div>
            </AnimatePresence>

            {totalCount % 20 === 0 && totalCount !== 0 && filmsLoadingStatus !== 'error' &&
                <motion.div 
                    className="load__more"
                    whileHover={{ scale: 1.05, translateY: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(fetchFilms())}
                >{loadMore}</motion.div>
            }
        </div>
    )
}

export default Catalog;