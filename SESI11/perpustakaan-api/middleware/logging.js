const logging = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${req.method}] ${req.originalUrl} - ${time}`);
  next();
};

module.exports = logging;
