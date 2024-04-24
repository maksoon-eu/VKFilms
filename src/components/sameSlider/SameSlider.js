import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSameFilms, selectAll } from "./sameSliderSlice";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";

import store from "../../store/store";

import SkeletonItem from "../skeleton/SkeletonItem";
import CatalogItem from "../catalogItem/CatalogItem";

import './sameSlider.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

const SameSlider = () => {
    const { sameFilmsLoadingStatus, totalCount } = useSelector(state => state.sameFilms);
    const sameFilms = selectAll(store.getState());

    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        if (!totalCount) {
            dispatch(fetchSameFilms(id));
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
            <SkeletonItem key={i}/>
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
              breakpoint: 1230,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 870,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    };

    const spinnerSlider = sameFilmsLoadingStatus === 'loading' ? skeletonList : null;
    return (
        <div className="sameSlider__minHeight">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                    key={sameFilmsLoadingStatus}
                >
                    {sameFilmsLoadingStatus === 'loading' ? <div className="skeleton__title skeleton__title--choose skeleton__title--slider"/> : <div className="sameSlider__title">Похожее</div>}
                    <Slider {...settings} className="sameSlider__slider">
                        {spinnerSlider}  
                        {similarMovieList}  
                    </Slider>
                    </motion.div>
            </AnimatePresence>
            </div>
    )
}

export default SameSlider;