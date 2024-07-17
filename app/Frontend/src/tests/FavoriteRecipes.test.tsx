import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe(('Teste renderização do Favorite Recipes'), () => {
  test('Teste Renderização dos elementos do Favorite Recipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });

    const heading = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
