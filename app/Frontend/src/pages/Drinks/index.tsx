import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import Recipes from '../../components/Recipes';
import Filters from '../../components/Filters.tsx';
import AppContext from '../../context/AppContext';

function Drinks() {
  const {
    stateFilterByCategoryDrinks } = useContext(AppContext);

  const [dataDrink, setDataDrink] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    if (stateFilterByCategoryDrinks === 'All') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=1';

    if (stateFilterByCategoryDrinks === 'Ordinary Drink') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';

    if (stateFilterByCategoryDrinks === 'Cocktail') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

    if (stateFilterByCategoryDrinks === 'Shake') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake';

    if (stateFilterByCategoryDrinks === 'Other/Unknown') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown';

    if (stateFilterByCategoryDrinks === 'Cocoa') url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa';

    fetch(url)
      .then((response) => response.json())
      .then((dataFetch) => {
        setDataDrink(dataFetch.drinks);
        setLoading(false);
      });
  }, [stateFilterByCategoryDrinks]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dataLen: [] = [];

  if (dataDrink.length >= 12) {
    for (let index = 0; index < 12; index += 1) {
      dataLen.push(dataDrink[index]);
    }
  } else {
    for (let index = 0; index < dataDrink.length; index += 1) {
      dataLen.push(dataDrink[index]);
    }
  }

  if (loading) return <div>Loading...</div>;

  console.log(dataLen);

  return (
    <Layout titlePage="Drinks" haveSearch haveFooter>
      <Filters type="Drinks" />
      { dataLen.map((drink :any, index) => (
        <NavLink to={ `/drinks/${drink.idDrink}` } key={ index }>
          <Recipes
            key={ index }
            index={ index }
            id={ drink.idDrink }
            name={ drink.strDrink }
            image={ drink.strDrinkThumb }
            type="drinks"
          />
        </NavLink>
      ))}
    </Layout>
  );
}
export default Drinks;
