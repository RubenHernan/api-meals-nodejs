const User = require('./users');
const Review = require('./reviews');
const Meal = require('./meals');
const Order = require('./orders');
const Restaurant = require('./restaurants');

const initModel = () => {

  //1 Restaurant N meals
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  //1 Restaurant N reviews
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  //1 User <----> N reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  //1 User <----> N orders
  User.hasMany(Order);
  Order.belongsTo(User);

    //1 Order <----> 1 meal
    Order.hasOne(Meal, {foreignKey: 'mealId'});
    Meal.hasOne(Order,{foreignKey: 'mealId'});


};

module.exports = initModel;
