import { afterEach, vi } from 'vitest';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import { renderWithRouter } from './RenderWithRouter';
import mockDataMeals from '../utils/mockDataMeals/mockDataMeals';
import mockDataFiltersList from '../utils/mockDataMeals/mockDataFiltersList';
import App from '../App';
import mockDataFilterBeef from '../utils/mockDataMeals/mockDataFilterBeef';
import mockDataFilterGoat from '../utils/mockDataMeals/mockDataFilterGoat';
import mockDataFilterBreakfast from '../utils/mockDataMeals/mockDataFilterBreakfast';
import mockDataFiltersChicken from '../utils/mockDataMeals/mockDataFiltersChicken';
import mockDataFilterDessert from '../utils/mockDataMeals/mockDataFilterDessert';

export const mockResponseFunc = (mock : any) => ({
  ok: true,
  status: 200,
  json: async () => mock,
}) as Response;

describe(('Testing page Meals'), async () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponseFunc(mockDataMeals))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFiltersList))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterBeef))
      .mockResolvedValueOnce(mockResponseFunc(mockDataMeals))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterGoat))
      .mockResolvedValueOnce(mockResponseFunc(mockDataMeals))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterBreakfast))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFiltersChicken))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterDessert));

    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('Should render page Meals', async () => {
    expect(screen.getByText(/Meals/i)).toBeInTheDocument();
  });

  it('Should render 12 cards', async () => {
    // await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByAltText(/Corba/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Kumpir/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Dal fry/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Poutine/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Lasagne/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Timbits/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Wontons/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Kafteji/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Big Mac/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Fish pie/i)).toBeInTheDocument();
  });

  it('Should render 6 buttons filters', async () => {
    // await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByTestId(/All-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Beef-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Breakfast-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Chicken-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Dessert-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Goat-category-filter/i)).toBeInTheDocument();
  });

  it('Should render Beef, Breakfast, Chicken, Dessert, Goat cards after click in filter and Toogle', async () => {
    screen.getByTestId(/Beef-category-filter/i).click();
    expect(await screen.findByAltText(/Beef and Mustard Pie/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Beef and Oyster pie/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Beef Asado/i)).toBeInTheDocument();

    const btnAll = screen.getByTestId(/All-category-filter/i);

    userEvent.click(btnAll);
    expect(await screen.findByAltText(/Corba/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Kumpir/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Dal fry/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Poutine/i)).toBeInTheDocument();

    const btnGoat = screen.getByTestId(/Goat-category-filter/i);

    userEvent.click(btnGoat);

    expect(await screen.findByAltText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();

    userEvent.click(btnGoat);

    expect(await screen.findByAltText(/Corba/i)).toBeInTheDocument();

    userEvent.click(btnAll);

    expect(await screen.findByAltText(/Kumpir/i)).toBeInTheDocument();

    const btnBreakfast = screen.getByTestId(/Breakfast-category-filter/i);

    userEvent.click(btnBreakfast);

    expect(await screen.findByAltText(/Breakfast Potatoes/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Bread omelette/i)).toBeInTheDocument();

    const btnChicken = screen.getByTestId(/Chicken-category-filter/i);

    userEvent.click(btnChicken);

    expect(await screen.findByAltText(/Chicken Couscous/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Chicken Couscous/i)).toBeInTheDocument();

    const btnDessert = screen.getByTestId(/Dessert-category-filter/i);

    userEvent.click(btnDessert);

    expect(await screen.findByAltText(/Apple & Blackberry Crumble/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Banana Pancakes/i)).toBeInTheDocument();
  });
});
