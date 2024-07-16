import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import SearchProvider from '../context/SearchProvider';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    userEvent: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe(('Componente Header'), () => {
  beforeEach(() => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );
  });
  test('Teste Renderização dos elementos do Header', async () => {
    const profileLink = screen.getByRole('img', {
      name: /profileicon/i,
    });
    await userEvent.click(profileLink);

    await waitFor(() => {
      const URL = window.location.pathname;
      expect(URL).toEqual('/profile');
    });
  });

  test('Renderiza Botão de busca', async () => {
    const searchBtn = screen.getByTestId('search-top-btn');

    await userEvent.click(searchBtn);
    const btnInputBar = screen.getByRole('textbox');
    expect(btnInputBar).toBeInTheDocument();
  });

  test('Renderiza Input de busca', async () => {
    const searchBtn = screen.getByTestId('search-top-btn');

    await userEvent.click(searchBtn);
    const inputBar = screen.getByRole('textbox');
    await userEvent.type(inputBar, 'Tofu');
    await waitFor(() => {
      expect(inputBar).toHaveValue('Tofu');
    });
  });
});
