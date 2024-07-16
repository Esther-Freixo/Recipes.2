import { useParams } from 'react-router-dom';
import RecipeDetailsMeals from '../../components/RecipeDetailsMeals';
import RecipeDetailsDrinks from '../../components/RecipeDetailsDrinks';

function RecipeDetails({ meals = false, drinks = false }) {
  type RouteParams = {
    id: string;
  };

  const { id } = useParams<RouteParams>() as { id: string };

  return (
    <div>
      {meals && (<RecipeDetailsMeals id={ id } />)}
      {drinks && (<RecipeDetailsDrinks id={ id } />)}
    </div>
  );
}

export default RecipeDetails;
