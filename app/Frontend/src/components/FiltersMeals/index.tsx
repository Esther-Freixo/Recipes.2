import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

interface MealsCategory {
  strCategory: string;
}

function FiltersMeals() {
  const {
    setStateFilterByCategoryMeals, stateFilterByCategoryMeals } = useContext(AppContext);
  const [dataMeals, setDataMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  const refresh = useCallback(() => {
    setLoading(true)
    fetch(`${apiUrl}/meals`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch meals: ${response.statusText}`);
        }
        return response.json();
      })
      .then((dataFetch) => {
        const processedMeals = dataFetch.map((meal: MealsCategory) => {
          const newStrCategory = meal.strCategory === 'Other / Unknown'
            ? meal.strCategory.replace(/\s/g, '')
            : meal.strCategory;
          return {
            ...meal,
            strCategory: newStrCategory,
          };
        });
        setDataMeals(processedMeals);
      })
      .catch ((error) => {
      console.error('Error fetching meals:', error);
    })
    .finally(() => setLoading(false))
}, [apiUrl]);

useEffect(() => {
  refresh();
}, [refresh]);

const dataLen5 = dataMeals.slice(0, 5);

const handleClick = (category: string) => {
  if (stateFilterByCategoryMeals === category ) {
    setStateFilterByCategoryMeals('All');
  } else {
    setStateFilterByCategoryMeals(category);
  }
}

if (loading) return <div>Loading...</div>;

return (
  <div>
    <button
      onClick={() => handleClick('All')}
      data-testid="All-category-filter"
    >
      All
    </button>
    {
      dataLen5.map((meal: any, index) => (
        <button
          key={index}
          data-testid={`${meal.strCategory}-category-filter`}
          onClick={() => {
            handleClick(meal.strCategory);
          }}
        >
          {meal.strCategory}
        </button>
      ))
    }
  </div>
);
}

export default FiltersMeals;
