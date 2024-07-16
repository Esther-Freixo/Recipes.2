import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import SearchProvider from '../context/SearchProvider';
import { renderWithRouter } from './RenderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe(('Componente SeachBar'), () => {
  beforeEach(() => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/meals' },
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica renderização do filtro de Primeira Letra', async () => {
    const mockValue = {
      meals: [{
        idMeal: '52871',
      }],
    };

    const fetchResovedValue = {
      json: async () => mockValue,
    } as Response;
    vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResovedValue)
      .mockResolvedValue(fetchResovedValue);

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    await userEvent.type(inputText, 'y');

    const nameInput = screen.findByRole('radio', {
      name: /first letter/i,
    });
    await userEvent.click(await nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);

    const URL = window.location.pathname;
    expect(URL).toEqual('/meals/52871');
  });

  test('Verifica renderização do SearchBar', async () => {
    const mockValue = {
      meals: [{
        idMeal: '52992',
      }],
    };

    const fetchResovedValue = {
      json: async () => mockValue,
    } as Response;
    vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResovedValue)
      .mockResolvedValue(fetchResovedValue);

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    userEvent.type(inputText, 'Soy');

    const nameInput = screen.findByRole('radio', {
      name: /name/i,
    });
    await userEvent.click(await nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);
    const URL = window.location.pathname;
    expect(URL).toEqual('/meals/52992');
  });

  test('Verifica a renderização do filtro de Ingredientes', async () => {
    const mockValue = {
      meals: [{
        idMeal: '52782',
      }],
    };

    const fetchResovedValue = {
      json: async () => mockValue,
    } as Response;
    vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResovedValue)
      .mockResolvedValue(fetchResovedValue);

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    userEvent.type(inputText, 'Potato');

    const nameInput = screen.findByRole('radio', {
      name: /ingredient/i,
    });
    await userEvent.click(await nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);
    const URL = window.location.pathname;
    expect(URL).toEqual('/meals/52782');
  });

  test('Emite alerta quando nenhuma receita é encontrada', async () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const mockValue = { meals: null, drinks: null };
    const fetchResolvedValue = { json: async () => mockValue } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(fetchResolvedValue);

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    userEvent.type(inputText, 'Teste');
    const nameInput = await screen.findByRole('radio', { name: /name/i });
    await userEvent.click(nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters");
    });
    mockAlert.mockRestore();
  });

  test(('Verifica se o alerta do filtro da primeira letra está correto'), async () => {
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    await userEvent.click(searchIcon);

    const inputText = screen.getByTestId(EXEC_SEARCH_BTN);
    userEvent.type(inputText, 'Soy');

    const nameInput = screen.findByRole('radio', {
      name: /first letter/i,
    });
    await userEvent.click(await nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
    mockAlert.mockRestore();
  });
});

describe(('Componente SeachBar Drinks'), () => {
  beforeEach(() => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      { route: '/drinks' },
    );
  });

  test('Verifica renderização da rota Drinks', async () => {
    const mockValueDrink = {
      drinks: [{
        idDrink: '11118',
      }],
    };

    const fetchResovedValue = {
      json: async () => mockValueDrink,
    } as Response;
    vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResovedValue)
      .mockResolvedValue(fetchResovedValue);

    const searchIcon = screen.getByTestId('search-top-btn');
    await userEvent.click(searchIcon);

    const inputText = screen.getByRole('textbox');
    userEvent.type(inputText, 'Blue Margarita');

    const nameInput = screen.findByRole('radio', {
      name: /name/i,
    });
    await userEvent.click(await nameInput);

    const searchButton = screen.getByTestId(EXEC_SEARCH_BTN);
    await userEvent.click(searchButton);
    const URL = window.location.pathname;
    expect(URL).toEqual('/drinks/11118');
  });
});
