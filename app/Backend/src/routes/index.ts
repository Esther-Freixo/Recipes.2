import { Router } from "express";
import mealsRouter from './meals.routes'
import drinksRouter from './drink.routes'

const router = Router();

router.use('/meals', mealsRouter)
router.use('/drinks', drinksRouter)

export default router;