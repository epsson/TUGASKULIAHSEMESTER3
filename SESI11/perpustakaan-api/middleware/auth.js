const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token !== 'admin123') {
    return res.status(401).json({
      message: 'Akses ditolak. Token tidak valid'
    });
  }

  next();
};

module.exports = auth;
