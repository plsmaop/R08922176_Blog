export default (res, httpCode = 500, code = 3, message = 'server error', data = {}) => {
  const responseData = {};
  responseData.code = code;
  responseData.message = message;
  responseData.data = data;
  res.status(httpCode).json(responseData);
};
