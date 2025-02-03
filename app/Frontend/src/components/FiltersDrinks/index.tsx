import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

interface DrinkCategory {
  strCategory: string;
}

function FiltersDrinks() {
  const { setStateFilterByCategoryDrinks, stateFilterByCategoryDrinks } = useContext(AppContext);
  const [dataDrink, setDataDrink] = useState<DrinkCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch drink categories
  const refresh = useCallback(() => {
    setLoading(true);
    fetch(`${apiUrl}/drinks`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch drinks: ${response.statusText}`);
        }
        return response.json();
      })
      .then((dataFetch) => {
        const processedDrinks = dataFetch.map((drink: DrinkCategory) => {
          const newStrCategory =
            drink.strCategory === 'Other / Unknown'
              ? drink.strCategory.replace(/\s/g, '')
              : drink.strCategory;
          return { ...drink, strCategory: newStrCategory };
        });
        setDataDrink(processedDrinks);
      })
      .catch((error) => {
        console.error('Error fetching drinks:', error);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dataLen5 = dataDrink.slice(0, 5); // Safely limit to 5 categories

  const handleClick = (category: string) => {
    if (stateFilterByCategoryDrinks === category) {
      setStateFilterByCategoryDrinks('All'); // Reset to "All" if the same category is clicked
    } else {
      setStateFilterByCategoryDrinks(category);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button
        onClick={() => handleClick('All')}
        data-testid="All-category-filter"
        className={stateFilterByCategoryDrinks === 'All' ? 'active' : ''}
      >
        All
      </button>
      {dataLen5.map((drink, index) => (
        <button
          data-testid={`${drink.strCategory}-category-filter`}
          key={index}
          onClick={() => handleClick(drink.strCategory)}
          className={stateFilterByCategoryDrinks === drink.strCategory ? 'active' : ''}
        >
          {drink.strCategory}
        </button>
      ))}
    </div>
  );
}

export default FiltersDrinks;
