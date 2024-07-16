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

describe(('Teste renderização do Done Recipes'), () => {
  test('Teste Renderização dos elementos do Done Recipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const heading = screen.getByRole('heading', {
      name: /done recipes/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
