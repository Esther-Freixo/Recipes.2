import { useEffect, useState } from 'react';

type RecipeDetails = {
  id: string;
};

function RecipeDetailsDrinks({ id }: RecipeDetails) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measuresList, setMeasuresList] = useState<string[]>([]);
  const [recomendedOfDrinks, setRecomendedOfDrinks] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const getIngredients = (itemDetails: any) => {
    const keys = Object.keys(itemDetails);

    return keys
      .filter(
        (key) =>
          key.includes('strIngredient') &&
          itemDetails[key] !== '' &&
          itemDetails[key] !== null
      )
      .map((key) => itemDetails[key]);
  };

  const getMeasures = (itemDetails: any) => {
    const keys = Object.keys(itemDetails);

    return keys
      .filter(
        (key) =>
          key.includes('strMeasure') &&
          itemDetails[key] !== '' &&
          itemDetails[key] !== null
      )
      .map((key) => itemDetails[key]);
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await fetch(`${apiUrl}/drinks/${id}`);
        if (!response.ok) throw new Error('Failed to fetch drink details');

        const dataFetch = await response.json();
        if (!dataFetch || dataFetch.length === 0) {
          console.error('No drinks found in the response');
          return;
        }

        setData(dataFetch);

        const ingredients = getIngredients(dataFetch[0]);
        const measures = getMeasures(dataFetch[0]);

        setIngredientsList(ingredients);
        setMeasuresList(measures);
      } catch (error) {
        console.error('Fetch failed: ', error);
        setData([]);
        setIngredientsList([]);
        setMeasuresList([]);
      }
    };

    const fetchRecommended = async () => {
      try {
        const response = await fetch(`${apiUrl}/meals`);
        if (!response.ok) throw new Error('Failed to fetch recommended meals');

        const dataFetch = await response.json();
        if (!dataFetch || dataFetch.length === 0) {
          console.warn('No recommended meals found');
          setRecomendedOfDrinks([]);
          return;
        }

        setRecomendedOfDrinks(dataFetch);
      } catch (error) {
        console.error('Fetch failed: ', error);
        setRecomendedOfDrinks([]);
      }
    };

    Promise.all([refresh(), fetchRecommended()])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error during data fetching:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No recipe details found.</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.idDrink}>
          <img
            src={item.strDrinkThumb}
            alt={item.strDrink}
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strDrink}</h2>
          <p data-testid="recipe-category">{item.strAlcoholic}</p>
          <ul>
            {ingredientsList.map((ingredient, index) => (
              <li
                key={ingredient}
                data-testid={`${index}-ingredient-name-and-measure`}
              >
                {`${ingredient} - ${measuresList[index] || 'N/A'}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{item.strInstructions}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetailsDrinks;
