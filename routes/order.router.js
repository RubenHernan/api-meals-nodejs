const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const orderMiddleware = require('./../middlewares/order.middleware');

//controllers
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.use(userMiddleware.protect);

router.post('/', validations.orderValidation, orderController.createOrder)

router.get('/me', orderController.listUserOrders);

router.route('/:id')
    .patch(orderMiddleware.validExistOrder, orderController.update)
    .delete(orderMiddleware.validExistOrder, orderController.delete)


    

module.exports = router;