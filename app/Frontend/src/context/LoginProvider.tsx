import { useState } from 'react';
import LoginContext from './LoginContext';

type LoginProviderProps = {
  children: React.ReactNode
};

function LoginProvider({ children }: LoginProviderProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <LoginContext.Provider
      value={ {
        email,
        setEmail,
        password,
        setPassword,
      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

export default LoginProvider;
