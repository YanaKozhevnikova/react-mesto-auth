import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h1 className="auth__heading">Регистрация</h1>
      <form onSubmit={handleSubmit} name="signup" className="form">
        <input value={email} onChange={handleEmailChange} type="email" required placeholder="Email" name="email" id="email-input" className="form__input form__input_type_auth" />
        <span className="form__input-error name-input-error"></span>
        <input value={password} onChange={handlePasswordChange} type="password" required minLength="2" maxLength="40" placeholder="Пароль" name="password" id="password-input" className="form__input form__input_type_auth" />
        <span className="form__input-error about-input-error"></span>
        <button type="submit" className="form__save-button form__save-button_type_auth">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>
    </div>
  )
}

export default Register;
