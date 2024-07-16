import { describe, vi } from 'vitest';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import AppProvider from '../context/AppProvider';
import App from '../App';
import { renderWithRouter } from './RenderWithRouter';
import { mockDataRecipeDetailsMeals, mockDataRecipeDetailsMealsDrinks } from '../utils/mockDataRecipeDetails/mockDataRecipeDetails';
import mockDataDrinks from '../utils/mockDataDrinks/mockDataDrinks';
import mockDataMeals from '../utils/mockDataMeals/mockDataMeals';

const mockResponseFunc = (mock: any) => ({
  ok: true,
  status: 200,
  json: async () => mock,
}) as Response;

describe(('Testing page Details Meals'), async () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(mockResponseFunc(mockDataRecipeDetailsMeals))
      .mockResolvedValueOnce(mockResponseFunc(mockDataDrinks));

    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
      { route: '/meals/52977' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('Should render page Details Meals', async () => {
    expect(await screen.findByText(/Corba/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-photo/i)).toBeInTheDocument();
  });
});

describe(('Testing page Details Drinks'), async () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(mockResponseFunc(mockDataRecipeDetailsMealsDrinks))
      .mockResolvedValueOnce(mockResponseFunc(mockDataMeals));

    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
      { route: '/drinks/178319' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('Should render page Details Drinks', async () => {
    expect(await screen.findByText(/155 Belmont/i)).toBeInTheDocument();
    expect(screen.getByTestId(/recipe-photo/i)).toBeInTheDocument();
  });
});
