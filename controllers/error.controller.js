const AppError = require('../utils/appErrors');

const handleCastError22P02 = () =>
  new AppError(
    'Some datatype doesnt match with the expected',
    400
  );

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  //si es operacional se manda la informacion al cliente;
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //avisarle al usuario que el error es del backend
    //programming or other unkown error: don't leak
    console.log('Error: ', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;
    console.log(error.parent?.code);

    if (error.parent?.code === '22P02')
      error = handleCastError22P02(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
