import { IDrinks } from "../Interfaces/drinks/IDrinks";

export default class DrinksModel {
    
async findAll(): Promise<IDrinks[]> {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data: IDrinks[] = await response.json();
    return data;
}

public async findById(id: string): Promise<IDrinks[]> {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IDrinks[] = await response.json();
    return data;
  }

public async findByName(name: string): Promise<IDrinks[]> {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: IDrinks[] = await response.json();
    return data;
    }
}

// /https://www.themealdb.com/api/json/v1/1/list.php?c=list