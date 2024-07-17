import { createContext } from 'react';

type AppProviderProps = {
  stateFilterByCategoryDrinks: string
  setStateFilterByCategoryDrinks: React.Dispatch<React.SetStateAction<string>>
  stateFilterByCategoryMeals: string
  setStateFilterByCategoryMeals: React.Dispatch<React.SetStateAction<string>>
  handleFilterByCategoryDrinks: boolean
  setHandleFilterByCategoryDrinks: React.Dispatch<React.SetStateAction<boolean>>
  handleFilterByCategoryMeals: boolean
  setHandleFilterByCategoryMeals: React.Dispatch<React.SetStateAction<boolean>>
};

const AppContext = createContext({} as AppProviderProps);

export default AppContext;
