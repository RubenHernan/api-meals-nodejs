const Meal = require('../models/meals');
const Order = require('../models/orders');
const Restaurant = require('../models/restaurants');
const User = require('../models/users');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

//REGISTER USER
exports.signup = catchAsync(
    async (req, res, next) => {
      const { requestTime } = req;
      const { name, email, password, role } =
        req.body;
  
      const user = await User.findOne({
        where: {
          email,
        },
      });
  
      if (user) {
        return next(
          new AppError(
            'User with that email already exists',
            404
          )
        );
      }
  
      const salt = await bcrypt.genSalt(12);
      const encryptedPass = await bcrypt.hash(
        password,
        salt
      );
  
      const userCreate = await User.create({
        name,
        email,
        password: encryptedPass,
        role,
      });
  
      const token = await generateJWT(
        userCreate.id
      );
  
      res.status(201).json({
        status: 'success',
        message: 'The user has been created!',
        requestTime,
        token,
        user: {
          id: userCreate.id,
          name: userCreate.name,
          email: userCreate.email,
          profifeImg: userCreate.profifeImgUrl,
          role: userCreate.role,
        },
      });
    }
  );
  
  exports.login = catchAsync(
    async (req, res, next) => {
      //1 traernos la informacion de la req.body
      const { email, password } = req.body;
  
      //2. buscar el usuario y revisar si existe
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          status: 'active',
        },
      });
  
      if (!user) {
        return next(
          new AppError(
            'The user could not be found',
            404
          )
        );
      }
  
      //3 validar si la contraseña es correcta
  
      if (
        !(await bcrypt.compare(
          password,
          user.password
        ))
      ) {
        return next(
          new AppError('Invalid credentials', 401)
        );
      }
  
      //4. generar el jsonwebtoken
      const token = await generateJWT(user.id);
  
      //5 enviar la respuesta al cliente
      res.status(200).json({
        status: 'success',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImgUrl: user.profileImgUrl,
          role: user.role,
        },
      });
    }
  );


exports.listOrders = catchAsync(async (req, res) => {
    const { sessionUser, requestTime } = req;
  
    const orders = await Order.findAll({
        where:{
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
  
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      results: orders.length,
      orders,
    });
  });

  exports.listOrdersById = catchAsync(async (req, res) => {
    const {order, requestTime } = req;
  
    res.status(200).json({
      status: 'success',
      message: 'The query has been done!',
      requestTime,
      order,
    });
  });

exports.update = catchAsync(async (req, res) => {
  const { user, requestTime } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully!',
    requestTime,
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { requestTime, user } = req;

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Deleted successfully',
    requestTime,
    user,
  });
});
