import { useEffect, useState } from 'react';
import { requestData } from '../../services/request';

type RecipeDetails = {
  id: string;
};

function RecipeDetailsMeals({ id }: RecipeDetails) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measuresList, setMeasuresList] = useState<string[]>([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const getIngredients = (itemDetails: any) =>
    Object.keys(itemDetails)
      .filter(
        (key) =>
          key.includes('strIngredient') &&
          itemDetails[key] !== '' &&
          itemDetails[key] !== null
      )
      .map((key) => itemDetails[key]);

  const getMeasures = (itemDetails: any) =>
    Object.keys(itemDetails)
      .filter(
        (key) =>
          key.includes('strMeasure') &&
          itemDetails[key] !== '' &&
          itemDetails[key] !== null
      )
      .map((key) => itemDetails[key]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const dataFetch = await requestData(`meals/${id}`);
        setData(dataFetch);

        const ingredients = getIngredients(dataFetch[0]);
        const measures = getMeasures(dataFetch[0]);

        setIngredientsList(ingredients);
        setMeasuresList(measures);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    const fetchRecommendedDrinks = async () => {
      try {
        const dataFetch = await requestData('drinks');
        setRecommendedDrinks(dataFetch);
      } catch (error) {
        console.error('Error fetching recommended drinks:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMealDetails(), fetchRecommendedDrinks()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No meal details found.</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.idMeal}>
          <img
            src={item.strMealThumb}
            alt={item.strMeal}
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{item.strMeal}</h2>
          <p data-testid="recipe-category">{item.strCategory}</p>
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
          {item.strYoutube && (
            <iframe
              data-testid="video"
              src={item.strYoutube.replace('watch?v=', 'embed/')}
              title="video"
              width="320"
              height="240"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeDetailsMeals;
