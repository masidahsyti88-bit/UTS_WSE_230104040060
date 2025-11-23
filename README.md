# Praktikum 7 — RESTful API Hardening & Observability
### Mata Kuliah: Web Service Engineering (20251)

## 1. Deskripsi Praktikum
Praktikum ini meningkatkan kualitas API hasil UTS dengan menambahkan fitur keamanan (hardening) dan observability (logging & monitoring). Tujuannya adalah membuat API lebih aman, stabil, dan mudah dipantau saat berjalan.

Fitur yang akan diimplementasikan:
- Security Middleware: Helmet, CORS, Rate Limit
- Environment Variable: menggunakan dotenv
- Logging: Morgan (atau Winston)
- Global Error Handler
- Health & Metrics Endpoint

## 2. Learning Outcomes
1. Menerapkan middleware keamanan dasar (Helmet, CORS, Rate Limit).
2. Menggunakan environment variable (.env) untuk konfigurasi project.
3. Menerapkan logging request menggunakan Morgan.
4. Membuat Global Error Handler yang konsisten dan reusable.
5. Membuat endpoint monitoring API (/api/health).
6. Memahami prinsip observability dalam Web Service Engineering.

## 3. Prasyarat
- Praktikum 5
- Praktikum 6
- UTS

Project yang digunakan adalah lanjutan dari hasil UTS.

## 4. Setup Project
1. Buat folder baru: `P7-Hardening-NIMAnda/`
2. Pindahkan project UTS ke dalamnya.
3. Install dependency:
```
npm install helmet cors express-rate-limit dotenv morgan
```
4. Buat file `.env`:
```
PORT=3000
RATE_LIMIT=100
NODE_ENV=development
```
5. Buat `.env.example`.

## 5. Implementasi Security & Observability

### A. Security Middleware
```js
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
```

Rate Limiter:
```js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.RATE_LIMIT,
  message: { status: "fail", message: "Terlalu banyak request." }
});
app.use(limiter);
```

### B. Logging
```js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### C. Error Handler
File: `src/middlewares/errorHandler.js`
```js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
};
```

Tambahkan ke app.js:
```js
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
```

### D. Health Endpoint
```js
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});
```

## 6. Struktur Folder
```
src/
 ├── app.js
 ├── routes/
 ├── controllers/
 ├── middlewares/
 ├── utils/
 ├── data/
 ├── logs/
 └── .env
```

## 7. Uji API
Uji:
- /api/health
- Rate limiter
- Logging
- Error handler
- CRUD resource

## 8. Output Praktikum
- Screenshot uji (/evidence/P8/)
- .env dan .env.example
- README_P8.md
- Project lengkap

## 9. Rubrik Penilaian
| Komponen | Bobot |
|---------|-------|
| Helmet, CORS, Rate Limit | 25% |
| Logging | 20% |
| Error Handler | 20% |
| Health Endpoint | 15% |
| Dokumentasi | 10% |
| Kerapian kode | 10% |

## 10. Catatan
- Resource tetap dari UTS.
- Gunakan struktur modular.

