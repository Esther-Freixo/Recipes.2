import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from '../context/LoginProvider';

function RenderWithLoginContext(element: React.ReactElement) {
  return (
    render(
      <BrowserRouter>
        <LoginProvider>
          { element }
        </LoginProvider>
      </BrowserRouter>,

    )
  );
}

export default RenderWithLoginContext;
