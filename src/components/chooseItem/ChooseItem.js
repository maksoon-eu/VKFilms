import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilm, selectAll } from "./chooseItemSlice";
import { AnimatePresence, motion } from "framer-motion";

import store from "../../store/store";
import moment from 'moment';

import SkeletonChoose from "../skeleton/SkeletonChoose";

import loadingImg from '../../resources/img/loading.svg';

import './chooseItem.scss';

const ChooseItem = () => {
    const {id} = useParams();

    const { filmLoadingStatus } = useSelector(state => state.film);
    const film = selectAll(store.getState());

    const dispatch = useDispatch();

    useEffect(() => {
        if (film[0]?.id !== id) {
            dispatch(fetchFilm(id));
        }
    }, [id])

    const filmContent = film.map(item => {
        const ratingColor = item.vote_average >= 7 ? 'greenText' : item.vote_average <= 7 && item.vote_average >= 5 ? 'yellowText' : item.vote_average <= 5 ? 'redText' : '';

        return (
            <div className="film__content" key={item.id}>
                <div className="film__flex">
                    <div className="film__backdrop">
                        <LazyLoadImage
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={`${process.env.REACT_APP_IMG_URL}/original${item.backdrop_path}`}
                            alt={item.title}
                        />
                    </div>
                    <div className="film__left">
                        <div className="film__img">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                effect="blur"
                                placeholderSrc={loadingImg}
                                src={`${process.env.REACT_APP_IMG_URL}/w500${item.poster_path}`}
                                alt={item.title}
                            />
                        </div>
                    </div>
                    <div className="film__right">

                        <div className="film__logo" style={{display: item.logo ? 'block' : 'none'}}>
                            <LazyLoadImage placeholderSrc={loadingImg} width='100%' height='100%' effect="blur" src={item.logo} alt={item.name}/>
                        </div>

                        <div className="film__name" style={{display: !item.logo ? 'block' : 'none'}}>{item.title}</div>
                        <div className="film__names">
                            <div className="film__alternativeName">{item.original_title}</div>
                        </div>
                        <div className="film__descr">{item.overview}</div>
                    </div>
                    <div className={`film__rating ${ratingColor}`}>{item.vote_average.toFixed(1)}</div>
                </div>

                <div className="film__tables">
                    <table className="film__table">
                        <caption className="film__about">О фильме</caption>
                        <tbody> 
                            <tr className="film__row">
                                <th className="film__title">Год</th>
                                <td className="film__text">{moment(item.premiere).format('LL')}</td>
                            </tr>
                            <tr className="film__row">
                                <th className="film__title">Страна</th>
                                <td className="film__text">{item.origin_country.join(', ')}</td>
                            </tr>
                            <tr className="film__row">
                                <th className="film__title">Жанр</th>
                                <td className="film__text">{item.genres.map(item => item.name).join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="film__table film__table--top">
                        <tbody> 
                        <tr className="film__row">
                                <th className="film__title">Длительность</th>
                                <td className="film__text">{item.runtime + ' мин / ' + Math.floor(item.runtime / 60) + ' ч ' + item.runtime % 60 + ' мин'}</td>
                            </tr>
                            <tr className="film__row">
                                <th className="film__title">Бюджет</th>
                                <td className="film__text">{item.budget} $</td>
                            </tr>
                            <tr className="film__row">
                                <th className="film__title">Сборы в мире</th>
                                <td className="film__text">{item.revenue} $</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    })

    return (
        <div className="film__minHeight">
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                    key={filmLoadingStatus}
                >
                    {filmLoadingStatus === 'loading' ? <SkeletonChoose/> : filmContent}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default ChooseItem;

