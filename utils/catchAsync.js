//me ejecuta un try catch, ejecuta next con el error si es que hay error
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // err => next(err)
  };
};

module.exports = catchAsync;
