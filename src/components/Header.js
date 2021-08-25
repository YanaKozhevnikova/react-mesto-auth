import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({loggedIn, email, onSignOut}) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logoPath} alt="Место" className="header__logo" />
      {loggedIn ? (
        <div className="header__container">
          <p className="header__user-info">{email}</p>
          <button onClick={onSignOut} className="header__link" type="button">Выйти</button>
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
