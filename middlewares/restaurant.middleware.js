const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appErrors');
const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');

exports.validExistRestaurant = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
  
      const restaurant = await Restaurant.findOne({
        where: {
          id,
        },
        include:[
            {
                model: Review
            }
        ]
      });
  
      if (!restaurant) {
        return next(
          new AppError('Restaurant not found', 404)
        );
      }
      req.restaurant = restaurant;
      next();
    }
  );


  exports.validExistRestaurantMeal = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
  
      const restaurant = await Restaurant.findOne({
        where: {
          id,
        }
      });
  
      if (!restaurant) {
        return next(
          new AppError('Restaurant not found', 404)
        );
      }
      req.restaurant = restaurant;
      next();
    }
  );