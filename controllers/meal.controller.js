const Meal = require('../models/meals');
const Restaurant = require('../models/restaurants');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(
    async (req, res, next) => {
      const { restaurant, requestTime } = req;
      const { name, price } =
        req.body;
  
      const meal = await Meal.create({
        name,
        price,
        restaurantId: restaurant.id
      });
  
      res.status(201).json({
        status: 'success',
        message: 'The meal has been created!',
        requestTime,
        meal
      });
    }
  );


exports.listMeals = catchAsync(async (req, res) => {
    const { requestTime } = req;
  
    const meals = await Meal.findAll({
        where: {
            status: "active"
        },
        include:[
            {
                model: Restaurant
            }
        ]
    });
  
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      results: meals.length,
      meals,
    });
  });

  exports.listMealById = catchAsync(async (req, res) => {
    const { meal, requestTime } = req;
      
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      meal,
    });
  });

exports.update = catchAsync(async (req, res) => {
  const { meal, requestTime } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully!',
    requestTime,
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { requestTime, meal } = req;

  await meal.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
    requestTime,
    meal,
  });
});

