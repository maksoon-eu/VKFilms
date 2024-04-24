import { Link } from "react-router-dom";

import logo from '../../resources/img/logo.svg';

import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__inner-logo">
                    <Link to="/films">
                        <img src={logo} alt="VKFilms" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;