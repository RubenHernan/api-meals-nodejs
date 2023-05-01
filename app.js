const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');

const usersRoutes = require('./routes/user.router');
const mealRoutes = require('./routes/meal.router');
const orderRoutes = require('./routes/order.router');
const restaurantRoutes = require('./routes/restaurant.router');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/appErrors');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1/users',usersRoutes);
app.use('/api/v1/restaurants',restaurantRoutes);
app.use('/api/v1/meals',mealRoutes);
app.use('/api/v1/orders',orderRoutes);

app.all('*', (req, res, next) => {
    return next(
      new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
  });
  
  app.use(globalErrorHandler);
  
  module.exports = app;