import FiltersDrinks from '../FiltersDrinks';
import FiltersMeals from '../FiltersMeals';

function Filters({ type } : { type: 'Drinks' | 'Meals' }) {
  return (
    <div>
      {
        type === 'Drinks' && <FiltersDrinks />
      }
      {
        type === 'Meals' && <FiltersMeals />
      }
    </div>
  );
}

export default Filters;
