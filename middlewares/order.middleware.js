const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appErrors');
const Order = require('../models/orders');
const Meal = require('../models/meals');
const Restaurant = require('../models/restaurants');

exports.validExistOrder = catchAsync(
    async (req, res, next) => {
     const { sessionUser} = req;
      const { id } = req.params;
  
      const order = await Order.findOne({
        where:{
            id,
            userId: sessionUser.id
        },
        include: [
          {
            model: Meal,
            include: [{
                model: Restaurant,}
                
            ]
          },
        ],
    });

    if (!order) {
        return next(
          new AppError(
            'This order doesnt exists for this user!',
            401
          )
        );
      }
      req.order = order;
      next();
    }
  );
  