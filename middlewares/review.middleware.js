const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appErrors');
const Review = require('../models/reviews');
const Restaurant = require('../models/restaurants');

exports.validExistRestaurant = catchAsync(
    async (req, res, next) => {
      const { restaurantId } = req.params;
  
      const restaurant = await Restaurant.findOne({
        where: {
          id: restaurantId,
        }
      });
  
      if (!restaurant) {
        return next(
          new AppError('Restaurant not found', 404)
        );
      }s
      req.restaurant = restaurant;
      next();
    }
  );

exports.validExistReview = catchAsync(
    async (req, res, next) => {
      const { id, restaurant } = req.params;
  
      const review = await Review.findOne({
        where: {
          id,
          restaurantId: restaurant.id
        }
      });
  
      if (!review) {
        return next(
          new AppError('Review not found', 404)
        );
      }s
      req.review = review;
      next();
    }
  );