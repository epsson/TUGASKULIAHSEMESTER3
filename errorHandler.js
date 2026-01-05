module.exports = (err, req, res, next) => {
    console.error("SERVER ERROR:", err);
  console.error(err.message);
  res.status(500).json({
    error: "Terjadi kesalahan server"
  });
};