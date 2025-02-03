import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import Recipes from '../../components/Recipes';
import Filters from '../../components/Filters.tsx';
import AppContext from '../../context/AppContext';
import styles from "./meals.module.css";
import HeroSection from '../../components/HeroSection';
import mealsImage from '../../images/img.webp'

function Meals() {
  const { stateFilterByCategoryMeals } = useContext(AppContext);

  const [dataMeal, setDataMeal] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_API_BASE_URL; // Use the backend URL from .env

  const refresh = useCallback(() => {
    let url = `${backendUrl}/meals`;

    if (stateFilterByCategoryMeals !== 'All') {
      url = `${backendUrl}/meals/category/${stateFilterByCategoryMeals}`;
    }

    setLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((dataFetch) => {
        setDataMeal(dataFetch || []); // Ensure it's always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching meals:', error);
        setDataMeal([]); // Set empty data on error
        setLoading(false);
      });
  }, [backendUrl, stateFilterByCategoryMeals]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dataLen = dataMeal.slice(0, 12); // Limit to 12 items

  if (loading) return <div>Loading...</div>;

  if (!dataMeal || dataMeal.length === 0) {
    return <div>No meals found for the selected category.</div>;
  }

  return (
    <Layout titlePage="Meals" haveSearch haveFooter>
      <Filters type="Meals" />
      <div>
        <HeroSection imageSrc={ mealsImage } title="Delicious Meals" altText="A table full of delicious food" />
      </div>
      <div className={ styles.mainBlock }>
        {dataLen.map((meal: any, index) => (
          <NavLink to={`/meals/${meal.idMeal}`} key={index}>
            <Recipes
              key={index}
              index={index}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
              category={meal.strCategory}
              area={meal.strArea}
              type="comidas"
            />
          </NavLink>
        ))}
    </div>
    </Layout>
  );
}

export default Meals;
