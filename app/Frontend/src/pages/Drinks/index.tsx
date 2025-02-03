import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import Recipes from '../../components/Recipes';
import Filters from '../../components/Filters.tsx';
import AppContext from '../../context/AppContext';
import styles from  './drinks.module.css' 
import HeroSection from '../../components/HeroSection';
import drinksImage from '../../images/drinksHeroImg.webp'

interface Drink {
  strAlcoholic: string | undefined;
  strCategory: string;
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

function Drinks() {
  const { stateFilterByCategoryDrinks } = useContext(AppContext);

  const [dataDrink, setDataDrink] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch drinks based on the selected category
  const refresh = useCallback(() => {
    let url = `${baseUrl}/drinks`;
    if (stateFilterByCategoryDrinks && stateFilterByCategoryDrinks !== 'All') {
      url = `${url}/category/${stateFilterByCategoryDrinks.replace(/\s/g, '_')}`;
    }
  
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data from backend: ${response.statusText}`);
        }
        return response.json();
      })
      .then((dataFetch) => {
        console.log('API Response:', dataFetch); 
        if (dataFetch && dataFetch) {
          setDataDrink(dataFetch);
        } else {
          setDataDrink([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching drinks:', error);
        setDataDrink([]); // Clear data on error
        setLoading(false);
      });
  }, [stateFilterByCategoryDrinks, baseUrl]);
  

  // Call refresh when the filter changes
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Limit the number of displayed drinks to 12
  const dataLen = dataDrink.slice(0, 12);

  if (loading) return <div>Loading...</div>;

  if (!dataDrink || dataDrink.length === 0) {
    return (
      <div>
        {stateFilterByCategoryDrinks === 'All'
          ? 'No drinks found.'
          : `No drinks found for the selected category: ${stateFilterByCategoryDrinks}.`}
      </div>
    );
  }

  return (
    <Layout titlePage="Drinks" haveSearch haveFooter>
      <Filters type="Drinks" />
      <div>
        <HeroSection imageSrc={ drinksImage } title="Delicious Drinks" altText="A table full of delicious drinks" />
      </div>
      <div className={ styles.mainBlock }>
      {dataLen.map((drink, index) => (
        <NavLink to={`/drinks/${drink.idDrink}`} key={index}>
          <Recipes
            index={index}
            id={drink.idDrink}
            name={drink.strDrink}
            image={drink.strDrinkThumb}
            category={drink.strCategory}
            alcoholic={drink.strAlcoholic}
            type="drinks"
          />
        </NavLink>
      ))}
      </div>
    </Layout>
  );
}

export default Drinks;
