function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "InvalidInput":
      status = 400;
      message = "Email/password is required";
      break;
    case "InvalidUser":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthenticated":
    case "Unauthorized":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "User not found.":
      status = 404;
      message = `User id ${err.id} not found.`;
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "Email is required":
      status = 400;
      message = "Email is required";
      break;
    case "Password is required":
      status = 400;
      message = "Password is required";
      break;
    case "InvalidUserToken":
      status = 401;
      message = "Invalid user token";
    case "Already Premium":
      status = 400;
      message = "Already Premium";
      break;
    default:
      console.error(err);
      break;
  }

  res.status(status).json({
    message: message,
  });
}

module.exports = errorHandler;
