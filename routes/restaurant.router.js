const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const reviewMiddleware = require('./../middlewares/review.middleware');
const restaurantMiddleware = require('./../middlewares/restaurant.middleware');

//controllers
const reviewController = require('../controllers/review.controller');
const restaurantController = require('../controllers/resturant.controller');

const router = express.Router();

router.get('/', restaurantController.listRestaurants)

router.get('/:id',restaurantMiddleware.validExistRestaurant, restaurantController.listRestaurantsById);

router.use(userMiddleware.protect);

router.post('/reviews/:id',restaurantMiddleware.validExistRestaurant, validations.reviewValidation,reviewController.createReview)

router.route('/reviews/:restaurantId/:id')
    .patch(restaurantMiddleware.validExistRestaurant, reviewMiddleware.validExistReview,validations.reviewValidation, reviewController.updateReview)
    .delete(restaurantMiddleware.validExistRestaurant, reviewMiddleware.validExistReview,validations.reviewValidation, reviewController.deleteReview)


router.use(userMiddleware.restrictTo('admin'));

router.post('/', validations.restaurantValidation,restaurantController.createRestaurant);

router.route('/:id').
    patch(restaurantMiddleware.validExistRestaurant, validations.updateRestaurantValidation,restaurantController.update)
    .delete(restaurantMiddleware.validExistRestaurant,restaurantController.delete)

    

module.exports = router;