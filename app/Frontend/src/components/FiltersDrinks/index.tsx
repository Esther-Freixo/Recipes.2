import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

function FiltersDrinks() {
  const {
    setStateFilterByCategoryDrinks,
    stateFilterByCategoryDrinks } = useContext(AppContext);

  const [dataDrink, setDataDrink] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    fetch('http://localhost:3001/drinks')
      .then((response) => response.json())
      .then((dataFetch) => {
        const processedDrinks = dataFetch.drinks.map((drink: any) => {
          const newStrCategory = drink.strCategory === 'Other / Unknown' ? drink.strCategory.replace(/\s/g, '') : drink.strCategory;
          return {
            ...drink,
            strCategory: newStrCategory,
          };
        });
        setDataDrink(processedDrinks);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dataLen5: [] = [];

  for (let index = 0; index < 5; index += 1) {
    dataLen5.push(dataDrink[index]);
  }

  const handleClick = (category: string) => {
    if (stateFilterByCategoryDrinks === 'All' && category === 'All') return;

    if (category === stateFilterByCategoryDrinks) {
      setStateFilterByCategoryDrinks('All');
    } else {
      setStateFilterByCategoryDrinks(category);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button
        onClick={ () => handleClick('All') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
       dataLen5.map((drink :any, index) => (
         <button
           data-testid={ `${drink.strCategory}-category-filter` }
           key={ index }
           onClick={ () => {
             handleClick(drink.strCategory);
           } }
         >
           { drink.strCategory }
         </button>
       ))
      }
    </div>
  );
}

export default FiltersDrinks;
