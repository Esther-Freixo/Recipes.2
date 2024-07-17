import mapStatusHTTP from "src/utils/mapStatusHTTP";

export default class MealsController {
  constructor(private mealsService = new mealsService()) {}
  
  public async getAllmeals(req: Request, res: Response): Promise<Response> {
  const serviceResponse = await this.mealsService.findAll();
  return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

}