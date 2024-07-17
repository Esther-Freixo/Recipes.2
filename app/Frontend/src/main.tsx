import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoginProvider from './context/LoginProvider';
import SearchProvider from './context/SearchProvider';
import AppProvider from './context/AppProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <LoginProvider>
        <SearchProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </SearchProvider>
      </LoginProvider>
    </BrowserRouter>,
  );
