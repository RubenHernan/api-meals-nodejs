const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('./../utils/catchAsync');
const User = require('../models/users');
const AppError = require('../utils/appErrors');

exports.protect = catchAsync(
  async (req, res, next) => {

    //1. extraer el token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        'Bearer'
      )
    ) {
      token =
        req.headers.authorization.split(' ')[1];
    }

    //2. validar si existe el token
    if (!token) {
      return next(
        new AppError(
          'You are not logged in!, Please log in to get access',
          401
        )
      );
    }
 
    //3. decodificar el jwt
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );
  
    //4. buscar el usuario y validar si existe
    const user = await User.findOne({
      where: {
        id: decoded.id,
        status: 'active',
      },
    });

    if (!user) {
      return next(
        new AppError(
          'The owner of this token it not longer available',
          401
        )
      );
    }

    req.sessionUser = user;
    next();
  }
);

exports.protectAccountOwner = catchAsync(
  async (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
      return next(
        new AppError(
          'You do not own this account.',
          401
        )
      );
    }

    next();
  }
);

exports.validExistUser = catchAsync(
    async (req, res, next) => {
      const { id } = req.params;
  
      const user = await User.findOne({
        where: {
          id,
        },
      });
  
      if (!user) {
        return next(
          new AppError('User not found', 404)
        );
      }
      req.user = user;
      next();
    }
  );
  
  exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.sessionUser.role)) {
        return next(
          new AppError(
            'You dont have access to this page!',
            403
          )
        );
      }
  
      next();
    };
  };