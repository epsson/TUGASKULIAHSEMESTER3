const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const validateQuary = require('./validateQuery');
const errorHandler = require('./errorHandler');

const app = express();

app.get('/', (req, res) => {
  res.send({
    message: "TMDb API berjalan!",
    contoh: "/movie/search?q=avatar"
  });
});

app.get('/movie/search', validateQuary, async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "Parameter q (judul film) wajib diisi"
    });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );

// Error dari API TMDb
if (!response.ok) {
    return res.status(response.status).json({
        status: response.status,
        error: "Data film tidak ditemukan atau API Key bermasalah"
  });
}

    const data = await response.json();

if (!data.results || data.results.length === 0) {
    return res.status(404).json({
        status: 404,
        error: "Film tidak ditemukan"
  });
}
    const hasil = data.results.map(movie => ({
      judul: movie.title,
      rilis: movie.release_date,
      rating: movie.vote_average
    }));

    res.json({
        status: 200,
        jumlah: hasil.length,
        data: hasil
    });

  } catch (error) {
    res.status(500).json({
      error: "Gagal mengakses API TMDb"
    });
  }
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});

