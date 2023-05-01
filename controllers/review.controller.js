
const Review = require('../models/reviews');
const catchAsync = require('../utils/catchAsync');


exports.createReview = catchAsync(async (req, res) => {
    const { sessionUser, restaurant, requestTime } = req;
    const { comment, rating } =
    req.body;

    const review = await Review.create({
        comment,
        rating,
        userId: sessionUser.id,
        restaurantId: restaurant.id
    })
      
    res.status(201).json({
      status: 'success',
      message: 'The review has been added!!',
      requestTime,
      review,
    });
  });


  exports.updateReview = catchAsync(async (req, res) => {
    const { sessionUser, review, requestTime } = req;
    const { comment, rating } =
    req.body;

    if (review.userId !== sessionUser.id) {
        return next(
          new AppError(
            'You do not own this account.',
            401
          )
        );
      }

      await review.update({
        comment,
        rating,
      }); 
      
    
    res.status(201).json({
      status: 'success',
      message: 'The review has been updated!!',
      requestTime,
      review,
    });
  });

  exports.deleteReview = catchAsync(async (req, res) => {
    const { sessionUser, review, requestTime } = req;

    if (review.userId !== sessionUser.id) {
        return next(
          new AppError(
            'You do not own this account.',
            401
          )
        );
      }
      await review.update({
        status: 'disabled',
      });
    
      res.status(200).json({
        status: 'success',
        message: 'Deleted successfully',
        requestTime,
        review,
      });
  });
