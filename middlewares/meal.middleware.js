const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appErrors');
const Meal = require('../models/meals');
const Restaurant = require('../models/restaurants');


exports.validExistMeal = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
  
      const meal = await Meal.findOne({
        where: {
          id,
          status: "active"
        },
      });
  
      if (!meal) {
        return next(
          new AppError('Meal not found', 404)
        );
      }
      req.meal = meal;
      next();
    }
  );
  
  exports.validExistMealWhitRestaurant = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
  
      const meal = await Meal.findOne({
        where: {
          id,
          status: "active"
        },include: [
            {
                model: Restaurant
            }
        ]
      });
  
      if (!meal) {
        return next(
          new AppError('Meal not found', 404)
        );
      }
      req.meal = meal;
      next();
    }
  );