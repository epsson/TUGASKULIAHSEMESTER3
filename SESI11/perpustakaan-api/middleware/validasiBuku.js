const validasiBuku = (req, res, next) => {
  const { judul, penulis, tahun } = req.body;

  if (!judul || !penulis || !tahun) {
    return res.status(400).json({
      message: 'Data tidak lengkap'
    });
  }

  if (isNaN(tahun)) {
    return res.status(400).json({
      message: 'Tahun harus berupa angka'
    });
  }

  next();
};

module.exports = validasiBuku;
