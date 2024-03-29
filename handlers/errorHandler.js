class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  const handleError = (err, res) => {
    let { statusCode, message } = err;
    if(!statusCode) statusCode = 500
    res.status(statusCode).json({
      success: false,
      code: statusCode,
      message,
    });
  };
  
  module.exports = {
    ErrorHandler,
    handleError,
  };