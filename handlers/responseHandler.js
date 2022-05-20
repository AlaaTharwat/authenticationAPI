exports.success = (statusCode, result, res) => {
  res.status(statusCode).send({ success: true, code: statusCode, result });
};
