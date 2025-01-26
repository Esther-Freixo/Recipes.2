import { IMeals } from "../Interfaces/meals/IMeals";

export default class MealsModel {
    
async findAll(): Promise<IMeals[]> {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data: IMeals[] = await response.json();
    return data;
}

public async findById(id: string): Promise<IMeals[]> {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IMeals[] = await response.json();
    return data;
  }

public async findByName(name: string): Promise<IMeals[]> {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IMeals[] = await response.json();
    return data;
    }
}

// /https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list