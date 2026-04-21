export function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  res.status(status).json({ success: false, data: null, error: error.message || 'Internal Server Error' });
}
