import { Request, Response } from 'express';
import MealsService from '../services/MealsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MealsController {
  constructor(private mealsService = new MealsService()) {}

  public async getAllMeals(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.mealsService.findAll();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMealById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.mealsService.findById(id);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMealByName(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const serviceResponse = await this.mealsService.findByName(name);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
