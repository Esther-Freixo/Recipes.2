import { Router } from "express";
import mealsRouter from './meals.routes'
import drinksRouter from './drink.routes'

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API! Use /meals or /drinks to access resources.');
  });
router.use('/meals', mealsRouter)
router.use('/drinks', drinksRouter)

export default router;