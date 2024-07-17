import { Request, Response, Router } from "express";
import MealController from '../controllers/MealsController';

const router = Router();

const mealsController = new MealController();

router.get('/meals', (req: Request, res: Response) => mealsController.getMeals(req, res));

export default router;