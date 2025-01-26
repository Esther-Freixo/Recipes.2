import { useEffect, useState } from 'react';

 type RecipeDetails = {
   id: string;
 };

function RecipeDetailsDrinks({ id } : RecipeDetails) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measuresList, setMeasuresList] = useState<string[]>([]);
  const [recomendedOfDrinks, setRecomendedOfDrinks] = useState([]);

  const getIngredients = (itemDetails: any) => {
    const keys = Object.keys(itemDetails);

    const ingredientsListOfObject = keys
      .filter((key) => key
        .includes('strIngredient')
        && itemDetails[key] !== '' && itemDetails[key] !== null);

    const ingredientsValues = ingredientsListOfObject.map((key) => itemDetails[key]);
    return ingredientsValues;
  };

  const getMeasures = (itemDetails: any) => {
    const keys = Object.keys(itemDetails);

    const measuresListOfObject = keys
      .filter((key) => key
        .includes('strMeasure')
        && itemDetails[key] !== '' && itemDetails[key] !== null);

    const measuresValues = measuresListOfObject.map((key) => itemDetails[key]);
    return measuresValues;
  };

  useEffect(() => {
    const refresh = () => {
      const url = `http://localhost:3001/drinks/${id}`;
      return fetch(url)
        .then((response) => response.json())
        .then((dataFetch) => {
          setData(dataFetch.drinks);

          const ingredients = getIngredients(dataFetch.drinks[0]);
          const measures = getMeasures(dataFetch.drinks[0]);

          setIngredientsList(ingredients);
          setMeasuresList(measures);
        })
        .catch((error) => {
          console.error('Fetch failed: ', error);
        });
    };
    const recomended = () => {
      const url = 'http://localhost:3001/meals';

      return fetch(url)
        .then((response) => response.json())
        .then((dataFetch) => {
          console.log(dataFetch.meals);
          setRecomendedOfDrinks(dataFetch.meals);
        })
        .catch((error) => {
          console.error('Fetch failed: ', error);
        });
    };

    Promise.all([refresh(), recomended()]).then(() => {
      setLoading(false);
    });
  }, [id]);

  // somente para passar no teste, são os meals recomendados para drinks que irão necessitar nos proximos exercicios

  console.log(recomendedOfDrinks);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data.map((item: any) => (
        <div key={ item.idDrink }>
          <img
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strDrink}</h2>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <ul>
            {
              ingredientsList.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measuresList[index]}`}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}

    </div>
  );
}

export default RecipeDetailsDrinks;
