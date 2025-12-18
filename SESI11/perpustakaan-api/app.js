const express = require('express');
const db = require('./db');
const logging = require('./middleware/logging');

const app = express();
app.use(express.json());
app.use(logging); // GLOBAL middleware

const PORT = 3000;
 app.get('/buku', (req, res) => {
  const sql = 'SELECT * FROM buku';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.get('/buku/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM buku WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: 'Buku tidak ditemukan' });

    res.json(result[0]);
  });
});

app.post('/buku', (req, res) => {
  const { judul, penulis, tahun } = req.body;

  if (!judul || !penulis || !tahun) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  if (isNaN(tahun)) {
    return res.status(400).json({ message: 'Tahun harus angka' });
  }

  const sql = 'INSERT INTO buku (judul, penulis, tahun) VALUES (?, ?, ?)';
  db.query(sql, [judul, penulis, tahun], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Buku berhasil ditambahkan', id: result.insertId });
  });
});

app.put('/buku/:id', (req, res) => {
  const { id } = req.params;
  const { judul, penulis, tahun } = req.body;

  const sql = 'UPDATE buku SET judul=?, penulis=?, tahun=? WHERE id=?';

  db.query(sql, [judul, penulis, tahun, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'ID tidak ditemukan' });

    res.json({ message: 'Data berhasil diupdate' });
  });
});

app.delete('/buku/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM buku WHERE id=?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'ID tidak ditemukan' });

    res.json({ message: 'Data berhasil dihapus' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const validasiBuku = require('./middleware/validasiBuku');
app.post('/buku', validasiBuku, (req, res) => {
  const { judul, penulis, tahun } = req.body;

  const sql = 'INSERT INTO buku (judul, penulis, tahun) VALUES (?, ?, ?)';
  db.query(sql, [judul, penulis, tahun], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Buku berhasil ditambahkan' });
  });
});
 app.put('/buku/:id', validasiBuku, (req, res) => {
  const { id } = req.params;
  const { judul, penulis, tahun } = req.body;

  const sql = 'UPDATE buku SET judul=?, penulis=?, tahun=? WHERE id=?';
  db.query(sql, [judul, penulis, tahun, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'ID tidak ditemukan' });

    res.json({ message: 'Data berhasil diupdate' });
  });
});

const auth = require('./middleware/auth');
app.delete('/buku/:id', auth, (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM buku WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'ID tidak ditemukan' });

    res.json({ message: 'Data berhasil dihapus' });
  });
});
