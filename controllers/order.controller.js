const Meal = require('../models/meals');
const Order = require('../models/orders');
const Restaurant = require('../models/restaurants');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(
    async (req, res, next) => {
      const { sessionUser, requestTime } = req;
      const { quantity, mealId } =
        req.body;

        const meal = await Meal.findOne({
            where: {
              id: mealId,
            },
          });
      
          if (!meal) {
            return next(
              new AppError('Meal not found', 404)
            );
          }
  
      const order = await Order.create({
        quantity,
        mealId: meal.id,
        userId: sessionUser.id,
        totalPrice: quantity * meal.price
      });
  
      res.status(201).json({
        status: 'success',
        message: 'The order has been created!',
        requestTime,
        order
      });
    }
  );


exports.listUserOrders = catchAsync(async (req, res) => {
    const {sessionUser, requestTime } = req;
  
    const orders = await Order.findAll({
        where: {
            userId: sessionUser.id
        },
        include:[
            {
                model: Meal,
                include: [
                    {
                        model: Restaurant
                    }
                ]
            }
        ]
    });
  
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      results: orders.length,
      orders,
    });
  });


exports.update = catchAsync(async (req, res) => {
  const { order, requestTime } = req;

  if(order.status !== "active"){
    return next(
        new AppError('The order is not active anymore!', 404)
      );
  }

  await order.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully!',
    requestTime,
  });
});

exports.delete = catchAsync(async (req, res) => {
    const { order, requestTime } = req;

    if(order.status !== "active"){
        return next(
            new AppError('The order is not active anymore!', 404)
          );
      }

    await order.update({
      status: 'cancelled',
    });
  
    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully!',
      requestTime,
    });
});

