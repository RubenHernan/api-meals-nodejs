const Restaurant = require('../models/restaurants');
const Review = require('../models/reviews');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(
    async (req, res, next) => {
      const { requestTime } = req;
      const { name, address, rating } =
        req.body;
  
      const restaurant = await Restaurant.create({
        name,
        address,
        rating
      });
  
      res.status(201).json({
        status: 'success',
        message: 'The restaurant has been created!',
        requestTime,
        restaurant
      });
    }
  );


exports.listRestaurants = catchAsync(async (req, res) => {
    const { requestTime } = req;
  
    const restaurants = await Restaurant.findAll({
        where: {
            status: "active"
        },
        include:[
            {
                model: Review
            }
        ]
    });
  
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      results: restaurants.length,
      restaurants,
    });
  });

  exports.listRestaurantsById = catchAsync(async (req, res) => {
    const { restaurant, requestTime } = req;
      
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      restaurant,
    });
  });

exports.update = catchAsync(async (req, res) => {
  const { restaurant, requestTime } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully!',
    requestTime,
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { requestTime, restaurant } = req;

  await restaurant.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
    requestTime,
    restaurant,
  });
});



