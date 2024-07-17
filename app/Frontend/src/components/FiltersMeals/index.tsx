import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';
import { requestData } from '../../services/request'

function FiltersMeals() {
  const {
    setStateFilterByCategoryMeals, stateFilterByCategoryMeals } = useContext(AppContext);
  const [dataMeals, setDataMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const dataFetch = await requestData('/meals');
      setDataMeals(dataFetch.meals || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();  
  }, [refresh]);

  const dataLen5: [] = [];

  for (let index = 0; index < 5; index += 1) {
    dataLen5.push(dataMeals[index]);
  }

  const handleClick = (category: string) => {
    if (stateFilterByCategoryMeals === 'All' && category === 'All') return;

    if (category === stateFilterByCategoryMeals) {
      setStateFilterByCategoryMeals('All');
    } else {
      setStateFilterByCategoryMeals(category);
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
       dataLen5.map((meal :any, index) => (
         <button
           key={ index }
           data-testid={ `${meal.strCategory}-category-filter` }
           onClick={ () => {
             handleClick(meal.strCategory);
           } }
         >
           { meal.strCategory }
         </button>
       ))
      }
    </div>
  );
}

export default FiltersMeals;
