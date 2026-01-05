module.exports = (req, res, next) => {
  const { q } = req.query;

  // Validasi: parameter wajib
  if (!q) {
    return res.status(400).json({
      status: 400,
      error: "Parameter q (judul film) wajib diisi"
    });
  }

  // Validasi: panjang minimal
  if (q.length < 3) {
    return res.status(400).json({
      status: 400,
      error: "Judul film minimal 3 karakter"
    });
  }

  next();
};