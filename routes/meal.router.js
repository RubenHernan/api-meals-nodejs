const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const mealMiddleware = require('./../middlewares/meal.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');

//controllers
const mealController = require('../controllers/meal.controller');

const router = express.Router();

router.get('/', mealController.listMeals)

router.get('/:id', mealMiddleware.validExistMealWhitRestaurant, mealController.listMealById);

router.use(userMiddleware.protect);

router.use(userMiddleware.restrictTo('admin'));

router.route('/:id').
    post(restaurantMiddleware.validExistRestaurantMeal, validations.mealValidation,mealController.createMeal)
    .patch(mealMiddleware.validExistMeal, validations.mealValidation,mealController.update)
    .delete(mealMiddleware.validExistMeal,mealController.delete)


    

module.exports = router;