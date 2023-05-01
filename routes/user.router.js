const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const orderMiddleware = require('./../middlewares/order.middleware')

//controllers
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post(
  '/signup',
  validations.createUserValidation,
  userController.signup
);

router.post('/login', validations.loginUserValidation, userController.login);

router.use(userMiddleware.protect);

router.route('/:id').
    patch(userMiddleware.validExistUser, validations.updateUserValidation,userMiddleware.protectAccountOwner,userController.update)
    .delete(userMiddleware.validExistUser,userMiddleware.protectAccountOwner,userController.delete)

    
router.get('/orders', userController.listOrders); //primero va sin id para evitar conflictos

router.get('/orders/:id', orderMiddleware.validExistOrder,userController.listOrdersById);


module.exports = router;