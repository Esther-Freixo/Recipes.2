import { afterEach, vi } from 'vitest';
import { waitForElementToBeRemoved, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import { renderWithRouter } from './RenderWithRouter';
import App from '../App';
import mockDataDrinks from '../utils/mockDataDrinks/mockDataDrinks';
import mockDataFilterList from '../utils/mockDataDrinks/mockDataFilterList';
import mockDataFilterOrdinary from '../utils/mockDataDrinks/mockDataFilterOrdinary';
import mockDataFilterCocktails from '../utils/mockDataDrinks/mockDataFilterCocktail';
import mockDataFilterShake from '../utils/mockDataDrinks/mockDataFilterShake';
import mockDataFilterOther from '../utils/mockDataDrinks/mockDataFilterOther';
import mockDataFilterCocoa from '../utils/mockDataDrinks/mockDataFilterCocoa';

const mockResponseFunc = (mock : any) => ({
  ok: true,
  status: 200,
  json: async () => mock,
}) as Response;

describe(('Testing page Meals'), async () => {
  beforeEach(async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponseFunc(mockDataDrinks))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterList))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterOrdinary))
      .mockResolvedValueOnce(mockResponseFunc(mockDataDrinks))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterCocktails))
      .mockResolvedValueOnce(mockResponseFunc(mockDataDrinks))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterShake))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterOther))
      .mockResolvedValueOnce(mockResponseFunc(mockDataFilterCocoa));

    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
      { route: '/drinks' },
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('Should render page Drinks', async () => {
    expect(screen.getByText(/Drinks/i)).toBeInTheDocument();
  });

  it('Should render drinks cards', async () => {
    // await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByAltText(/A1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/GG/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ABC/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Ace/i)).toBeInTheDocument();
  });

  it('Should render 6 buttons filters', async () => {
    // await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByTestId(/All-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Ordinary Drink-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Cocktail-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Shake-category-filter/i)).toBeInTheDocument();
    expect(screen.getByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
    expect(screen.getByTestId(/Cocoa-category-filter/i)).toBeInTheDocument();
  });

  it('Should render Ordinary, Cocktail, Shake, Other, Cocoa cards after click in filter and Toogle', async () => {
    screen.getByTestId(/Ordinary Drink-category-filter/i).click();
    expect(await screen.findByAltText(/3-Mile Long Island Iced Tea/i)).toBeInTheDocument();

    expect(screen.getByAltText('50/50')).toBeInTheDocument();
    const btnAll = screen.getByTestId(/All-category-filter/i);

    userEvent.click(btnAll);
    expect(await screen.findByAltText(/A1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/GG/i)).toBeInTheDocument();
    const btnCocktail = screen.getByTestId(/Cocktail-category-filter/i);

    userEvent.click(btnCocktail);

    expect(await screen.findByAltText('155 Belmont')).toBeInTheDocument();

    expect(screen
      .getByAltText('57 Chevy with a White License Plate'))
      .toBeInTheDocument();

    userEvent.click(btnCocktail);

    expect(await screen.findByAltText(/Ace/i)).toBeInTheDocument();

    userEvent.click(btnAll);

    expect(await screen.findByAltText(/A1/i)).toBeInTheDocument();

    const btnShake = screen.getByTestId(/Shake-category-filter/i);

    userEvent.click(btnShake);

    expect(await screen.findByAltText(/151 Florida Bushwacke/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Banana Milk Shake/i)).toBeInTheDocument();

    const btnOther = screen.getByTestId('Other/Unknown-category-filter');

    userEvent.click(btnOther);

    expect(await screen.findByAltText(/A Piece of Ass/i)).toBeInTheDocument();

    expect(screen.getByAltText(/maretto Stone Sour Alternative/i)).toBeInTheDocument();

    const btnCocoa = screen.getByTestId(/Cocoa-category-filter/i);

    userEvent.click(btnCocoa);

    expect(await screen.findByAltText(/Castillian Hot Chocolate/i)).toBeInTheDocument();

    expect(screen.getByAltText(/Nuked Hot Chocolate/i)).toBeInTheDocument();
  });
});
