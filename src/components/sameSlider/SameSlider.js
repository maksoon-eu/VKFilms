import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSameFilms, selectAll } from "./sameSliderSlice";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";

import store from "../../store/store";

import CatalogItem from "../catalogItem/CatalogItem";

import './sameSlider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../skeleton/skeleton.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';

const SameSlider = () => {
    const { sameFilmsLoadingStatus, totalCount } = useSelector(state => state.sameFilms);
    const sameFilms = selectAll(store.getState());

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        if (localStorage.getItem('currentSameId') !== id || !totalCount) {
            dispatch(fetchSameFilms(id));
            localStorage.setItem('currentSameId', id);
        }
    }, [id]);

    const skeletonArr = ['', '', '', '', ''];

    const similarMovieList = sameFilms.map(item => {
        return (
            <div key={item.id}>
                <div className="sameSlider__item">
                    <CatalogItem item={item}/>
                </div>
            </div>
        )
    });

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <div key={i}>
                <div className="skeleton__item skeleton--wave skeleton__item--choose"/>
            </div>
        )
    });

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1190,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 974,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 438,
              settings: {
                slidesToShow: 2
              }
            }
        ]
    };

    const content = sameFilmsLoadingStatus === 'loading' ? skeletonList : similarMovieList;
    const title = sameFilmsLoadingStatus === 'loading' ? <div className="skeleton__title skeleton__title--choose skeleton__title--slider"/> : <div className="sameSlider__title">Похожее</div>;
    return (
        <>
            {(totalCount || sameFilmsLoadingStatus === 'loading') && sameFilmsLoadingStatus !== 'error' &&
            <div className="sameSlider__minHeight">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={sameFilmsLoadingStatus}
                    >
                        {title}
                        <Slider {...settings} className="sameSlider__slider">
                            {content}
                        </Slider>
                        </motion.div>
                </AnimatePresence>
            </div>}
        </>
    )
}

export default SameSlider;