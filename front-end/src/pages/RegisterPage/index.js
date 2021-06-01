import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { handleLogin } from '../../services/localStorage';

function RegisterPage() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const emailRegex = /\w+@+\w+.com/g;
    const nameRegex = /^[a-zA-Z ]+$/g;
    const minName = 12;
    const minPass = 6;
    if (!name || name.length < minName || !nameRegex.test(name)
      || !password || password.length < minPass
      || !emailRegex.test(email)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [name, email, password]);

  function redirectTo() {
    if (isSeller) history.push('/admin/orders');
    else history.push('/products');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.registerUser({ name, email, password, isSeller });

      if (res.error) {
        const userExists = 'Email already registered';
        if (res.message === userExists) setError('Já existe um usuário com esse e-mail.');
      } else {
        handleLogin(res);
        redirectTo();
      }
    } catch (err) {
      setError('Alguma coisa deu errado');
    }
  }

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="signup-name">
          Nome
          <input
            required
            autoComplete="off"
            type="text"
            id="signup-name"
            data-testid="signup-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="signup-email">
          Email
          <input
            required
            autoComplete="off"
            type="email"
            id="signup-email"
            data-testid="signup-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="signup-password">
          Senha
          <input
            required
            autoComplete="off"
            type="password"
            id="signup-password"
            data-testid="signup-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <label htmlFor="signup-seller">
          <input
            type="checkbox"
            id="signup-seller"
            data-testid="signup-seller"
            name="isSeller"
            value={ isSeller }
            onChange={ () => setIsSeller((prev) => !prev) }
          />
          Quero vender
        </label>
        <button type="submit" data-testid="signup-btn" disabled={ !isValid }>
          Cadastrar
        </button>
        { error }
      </form>
    </section>
  );
}

export default RegisterPage;
