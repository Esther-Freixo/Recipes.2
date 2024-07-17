import MealsModel from "../models/MealsModel";
import { IMeals } from "../Interfaces/meals/IMeals";
import { ServiceResponse } from "../Interfaces/ServiceResponse";

export default class MealsService {
  constructor(private mealsModel = new MealsModel()) {}

  public async findAll(): Promise<ServiceResponse<IMeals[]>> {
    const allMeals = await this.mealsModel.findAll();
    return { status: 'SUCCESSFUL', data: allMeals };
  }

  public async findById(id: string): Promise<ServiceResponse<IMeals[]>> {
    const meal = await this.mealsModel.findById(id);
    return { status: 'SUCCESSFUL', data: meal };
  }

  public async findByName(name: string): Promise<ServiceResponse<IMeals[]>> {
    const meal = await this.mealsModel.findByName(name);
    return { status: 'SUCCESSFUL', data: meal };
  }
}