import { useState } from 'react';
import AppContext from './AppContext';

type AppProviderProps = {
  children: React.ReactNode
};

function AppProvider({ children }: AppProviderProps) {
  const [
    stateFilterByCategoryDrinks,
    setStateFilterByCategoryDrinks] = useState<string>('All');

  const [
    stateFilterByCategoryMeals, setStateFilterByCategoryMeals] = useState<string>('All');

  const [handleFilterByCategoryDrinks, setHandleFilterByCategoryDrinks] = useState(false);

  const [handleFilterByCategoryMeals, setHandleFilterByCategoryMeals] = useState(false);

  return (
    <AppContext.Provider
      value={ {
        // add context values here
        stateFilterByCategoryDrinks,
        setStateFilterByCategoryDrinks,
        stateFilterByCategoryMeals,
        setStateFilterByCategoryMeals,
        handleFilterByCategoryDrinks,
        setHandleFilterByCategoryDrinks,
        handleFilterByCategoryMeals,
        setHandleFilterByCategoryMeals,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;
