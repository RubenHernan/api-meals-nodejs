const {
  body,
  validationResult,
} = require('express-validator');

const validFields = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: error.mapped(),
    });
  }
  next();
};

//Validating user

exports.createUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Must be a email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Must be a email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 8 characters long'
    ),
  validFields,
];


exports.updateUserValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Must be a email!'),
  validFields,
];



//validating restaurants

exports.restaurantValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('address')
    .notEmpty()
    .withMessage('Address is required!'),
  body('rating')
    .notEmpty()
    .withMessage(
      'Rating is required!'
    ).isInt({min:1, max:5})
    .withMessage(
      'Rating must be between 1 to 5!'
    ),
  validFields,
];

exports.updateRestaurantValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('address')
    .notEmpty()
    .withMessage('Address is required!'),
  validFields,
];


exports.reviewValidation = [
  body('comment')
    .notEmpty()
    .withMessage('Comment is required!'),
  body('rating')
    .notEmpty()
    .withMessage(
      'Rating is required!'
    ).isInt({min:1, max:5})
    .withMessage(
      'Rating must be between 1 to 5!'
    ),
  validFields,
];


//validating meals

exports.mealValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required!'),
  body('price')
    .notEmpty()
    .withMessage('Price is required!')
    .isInt()
    .withMessage(
      'Price must be a integer!'
    ),
  validFields,
];


//validating orders

exports.orderValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required!')
    .isInt()
    .withMessage(
      'Quantity must be a integer!'
    ),
  body('mealId')
    .notEmpty()
    .withMessage('Meal is required!'),
  validFields,
];

