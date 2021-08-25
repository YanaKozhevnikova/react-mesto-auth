import React from 'react';


function Login({ onLogin }) {
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
    onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <h1 className="auth__heading">Вход</h1>
      <form onSubmit={handleSubmit} name="signin" className="form">
        <input value={email} onChange={handleEmailChange} type="email" required placeholder="Email" name="email" id="email-input" className="form__input form__input_type_auth" />
        <span className="form__input-error name-input-error"></span>
        <input value={password} onChange={handlePasswordChange} type="password" required minLength="2" maxLength="40" placeholder="Пароль" name="password" id="password-input" className="form__input form__input_type_auth" />
        <span className="form__input-error about-input-error"></span>
        <button type="submit" className="form__save-button form__save-button_type_auth">Войти</button>
      </form>
    </div>
  )
}

export default Login;
