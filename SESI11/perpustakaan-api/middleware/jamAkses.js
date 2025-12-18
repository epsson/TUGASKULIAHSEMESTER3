const jamAkses = (req, res, next) => {
  const now = new Date();
  const hour = now.getHours(); // 0–23

  if (hour < 8 || hour >= 18) {
    return res.status(403).json({
      message: 'API hanya dapat diakses antara jam 08.00 – 18.00'
    });
  }

  next();
};

module.exports = jamAkses;
