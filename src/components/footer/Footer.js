import { Link } from "react-router-dom";

import logo from '../../resources/img/logo.svg';

import './footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__inner">
                <div className="footer__inner-line"></div>
                <div className="footer__inner-logo">
                    <Link to="/films">
                        <img src={logo} alt="VKFilms" />
                    </Link>
                </div>

                <div className="footer__info-title">{`© 2024–${new Date().getFullYear()} «VFilms»`}</div>
                <div className="footer__info-text">При полном или частичном использовании материалов с сайта ссылка на источник обязательна.</div>
                <div className="footer__info-text">Продолжая работу с сайтом, вы даете согласие на использование сайтом cookies и обработку персональных данных в целях функционирования сайта и улучшения сервиса.</div>
            </div>
        </footer>
    )
}

export default Footer;