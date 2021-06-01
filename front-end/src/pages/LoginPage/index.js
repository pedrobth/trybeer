import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import api from '../../services/api';
import { handleLogin } from '../../services/localStorage';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const [messageError, setMessageError] = useState('');

  const history = useHistory();
  useEffect(() => {
    const six = 6;
    const emailRegex = /\w+@+\w+.com/;
    if (!emailRegex.test(email) || password.length < six) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.loginUser(email, password)
      .then((response) => {
        if (response.error) {
          setMessageError(response.message);
        } else {
          handleLogin(response.message);
          const route = response.message.role === 'administrator'
            ? '/admin/orders' : '/products';
          history.push(route);
        }
      });
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="input-email-login">
          Email:
          <input
            required
            type="email"
            id="input-email-login"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="input-password-login">
          Senha:
          <input
            required
            type="password"
            id="input-password-login"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="submit"
          data-testid="signin-btn"
          disabled={ !valid }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
        <p>{messageError}</p>
      </form>
    </section>
  );
}

export default LoginPage;
