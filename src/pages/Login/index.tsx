import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';
import tomate from '../../images/tomate.svg';
import logoRecipes from '../../images/logoRecipes.svg';
import style from './login.module.css';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(LoginContext);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (emailRegex.test(email) && password.length > 6) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [email, password]);

  const handleClick = (e:any) => {
    e.preventDefault();
    const emailStorageData = {
      email,
    };

    const emailStorage = JSON.stringify(emailStorageData);
    localStorage.setItem('user', emailStorage);
    navigate('/meals');
  };

  return (
    <main className={ style.main }>
      <div className={ style.background }>
        <img src={ logoRecipes } alt="logoRecipes" className={ style.icon } />
        <img src={ tomate } alt="tomate" className={ style.image } />
      </div>
      <form id="LoginForm" className={ style.form }>
        <h2 className={ style.title }>LOGIN</h2>
        <label htmlFor="email-input">
          <input
            placeholder="Email"
            type="email"
            data-testid="email-input"
            id="email-input"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            className={ style.formInput }
          />
        </label>
        <label htmlFor="password-input">
          <input
            placeholder="Password"
            type="password"
            data-testid="password-input"
            id="password-input"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            className={ style.formInput }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !isButtonEnabled }
          className={ style.btn }
        >
          Enter
        </button>
      </form>
    </main>
  );
}
export default Login;
