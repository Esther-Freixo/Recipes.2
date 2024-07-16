import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import Recipes from '../../components/Recipes';
import Filters from '../../components/Filters.tsx';
import AppContext from '../../context/AppContext';

function Meals() {
  const {
    stateFilterByCategoryMeals,
  } = useContext(AppContext);

  const [dataMeal, setDataMeal] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    if (stateFilterByCategoryMeals === 'All') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    if (stateFilterByCategoryMeals === 'Beef') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';

    if (stateFilterByCategoryMeals === 'Breakfast') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';

    if (stateFilterByCategoryMeals === 'Chicken') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';

    if (stateFilterByCategoryMeals === 'Dessert') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

    if (stateFilterByCategoryMeals === 'Goat') url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';

    fetch(url)
      .then((response) => response.json())
      .then((dataFetch) => {
        // aqui iriamos setar o dataFetch no estado global, mas temporariamente iremos apenas mandar pra o estado local
        setDataMeal(dataFetch.meals);
        setLoading(false);
      });
  }, [stateFilterByCategoryMeals]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // console.log(dataMeal);

  // const filteredCategory = dataMeal.filter((meal: any) => {
  //   if (stateFilterByCategoryMeals === '') return meal;
  //   return meal.strCategory === stateFilterByCategoryMeals;
  // });

  const dataLen: [] = [];

  if (dataMeal.length >= 12) {
    for (let index = 0; index < 12; index += 1) {
      dataLen.push(dataMeal[index]);
    }
  } else {
    for (let index = 0; index < dataMeal.length; index += 1) {
      dataLen.push(dataMeal[index]);
    }
  }
  if (loading) return <div>Loading...</div>;

  return (
    <Layout titlePage="Meals" haveSearch haveFooter>
      <Filters type="Meals" />
      { dataLen.map((meal: any, index) => (
        <NavLink to={ `/meals/${meal.idMeal}` } key={ index }>
          <Recipes
            key={ index }
            index={ index }
            id={ meal.idMeal }
            name={ meal.strMeal }
            image={ meal.strMealThumb }
            // category={ meal.strCategory }
            // area={ meal.strArea }
            type="comidas"
          />
        </NavLink>
      ))}

    </Layout>
  );
}

export default Meals;
