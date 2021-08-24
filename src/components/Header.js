import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <a href="#" target="_self">
        <img src={logoPath} alt="Место" className="header__logo" />
      </a>
      {props.loggedIn ? (
        <div className="header__container">
          <p className="header__user-info">{props.email}</p>
          <button onClick={props.onSignOut} className="header__link" type="button">Выйти</button>
        </div>
      ) : (
        <Link className="header__link" to={(location.pathname === '/signup') ? '/signin' : '/signup'}>
          {`${(location.pathname === '/signup') ? 'Войти' : 'Регистрация'}`}
        </Link>
      )}
    </header>
  )
}

export default Header;
