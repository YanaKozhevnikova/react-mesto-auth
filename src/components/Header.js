import logoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
        <a href="#" target="_self">
          <img src={logoPath} alt="Место" className="header__logo" />
        </a>
    </header>
  )
}

export default Header;
