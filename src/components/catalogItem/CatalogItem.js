import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import moment from 'moment';
import 'moment/locale/ru';

import loadingImg from "../../resources/img/loading.svg";

import 'react-lazy-load-image-component/src/effects/blur.css';
import './catalogItem.scss';

const CatalogItem = ({ item }) => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);

    moment.locale('ru');

    useEffect(() => {
        if (onScreen) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: {
                duration: 0.6,
                ease: "easeOut"
                }
            });
        }
    }, [onScreen, controls]);

    const ratingColor = item.vote_average >= 7 ? 'greenBackground' : item.vote_average <= 7 && item.vote_average >= 5 ? 'yellowBackground' : item.vote_average <= 5 ? 'redBackground' : '';

    return (
        <motion.div
            ref={rootRef}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            exit={{ opacity: 0, y: -20 }}
            variants={{
                open: {
                    opacity: 1, y: 0
                },
                closed: {
                    opacity: 0, y: 20
                }
                }}
        >
            <Link to={`/films/${item.id}`} className="catalog__item">
                <div className="catalog__item-img">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        effect="blur"
                        placeholderSrc={loadingImg}
                        src={`${process.env.REACT_APP_IMG_URL}/w300${item.poster_path}`}
                        alt={item.title}
                        style={{transition: '.2s linear'}}
                    />
                    <div className={`catalog__item-rating ${ratingColor}`}>{item.vote_average.toFixed(1)}</div>
                    <div className="catalog__hover">
                        <div className="catalog__hover-bg"></div>
                        <div className={`catalog__hover-rating ${ratingColor}`}>{item.vote_average.toFixed(1)}</div>
                        <div className="catalog__hover-date">{moment(item.release_date).format('LL')}</div>
                    </div>
                </div>
                <div className="catalog__item-name">{item.title}</div>
            </Link>
        </motion.div>
    );
};

export default CatalogItem;