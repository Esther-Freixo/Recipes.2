import { ServiceResponse } from "../Interfaces/ServiceResponse";

export default class MealsService {
  constructor(private mealsModel = new MealsModel()) {}

  public async findAll(): Promise<ServiceResponse<IMeals[]>> {
    const allMeals = await this.mealsModel.findAll();
    return { status: 'SUCCESSFUL', data: allMeals };
  }

}