const executionTime = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[EXECUTION TIME] ${req.method} ${req.originalUrl} - ${duration} ms`
    );
  });

  next();
};

module.exports = executionTime;
