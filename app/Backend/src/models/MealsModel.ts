import axios from "axios";
import { IMeals } from "../Interfaces/meals/IMeals";

export default class MealsModel {
  private apiUrl: string;

  constructor(){
    this.apiUrl = process.env.API_URL_MEALS || 'https://www.themealdb.com/api/json/v1/1/';
  }
    
async findAll(): Promise<IMeals[]> {
    const response = await axios.get(`${this.apiUrl}/search.php?s=`);
    const data: IMeals[] = await response.data.meals;
    return data;
}

public async findById(id: string): Promise<IMeals[]> {
    const response = await axios.get(`${this.apiUrl}/lookup.php?i=${id}`);
    
    const data: IMeals[] = await response.data.meals;
    return data;
  }

public async findByName(name: string): Promise<IMeals[]> {
    const response = await axios.get(`${this.apiUrl}/search.php?s=${name}`);

    const data: IMeals[] = await response.data.meals;
    return data;
    }
}

