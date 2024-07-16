import { useEffect, useState } from 'react';

type RecipeDetails = {
  id: string;
};

function RecipeDetailsMeals({ id } : RecipeDetails) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measuresList, setMeasuresList] = useState<string[]>([]);
  const [recomendedOfMeals, setRecomendedOfMeals] = useState([]);

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
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

      return fetch(url)
        .then((response) => response.json())
        .then((dataFetch) => {
          setData(dataFetch.meals);

          const ingredients = getIngredients(dataFetch.meals[0]);
          const measures = getMeasures(dataFetch.meals[0]);

          setIngredientsList(ingredients);
          setMeasuresList(measures);
        })
        .catch((error) => {
          console.error('Fetch failed: ', error);
        });
    };

    const recommended = () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

      return fetch(url)
        .then((response) => response.json())
        .then((dataFetch) => {
          console.log(dataFetch.drinks);
          setRecomendedOfMeals(dataFetch.drinks);
        })
        .catch((error) => {
          console.error('Fetch failed: ', error);
        });
    };

    Promise.all([refresh(), recommended()]).then(() => {
      setLoading(false);
    });
  }, [id]);

  // somente para passar no teste, são os meals recomendados para drinks que irão necessitar nos proximos exercicios

  console.log(recomendedOfMeals);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data.map((item: any) => (
        <div key={ item.idMeal }>
          <img
            src={ item.strMealThumb }
            alt={ item.strMeal }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strMeal}</h2>
          <p data-testid="recipe-category">{ item.strCategory }</p>
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
          <iframe
            data-testid="video"
            src={ item.strYoutube.replace('watch?v=', 'embed/') }
            title="video"
            width="320"
            height="240"
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeDetailsMeals;
