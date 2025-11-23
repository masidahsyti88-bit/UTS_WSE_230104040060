require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();

// Middleware keamanan
app.use(helmet());
app.use(cors());

// Rate limiting (mencegah spam/DDoS)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100,
    message: {
        status: "error",
        message: "Terlalu banyak request - coba lagi nanti"
    }
});
app.use(limiter);

// Body parser
app.use(express.json());

// Logging request
app.use(morgan("dev"));


// =========================
// ROUTES CRUD STUDENTS
// =========================
const studentRoutes = require("./src/routes/studentsRoutes");
app.use("/api/students", studentRoutes);


// =========================
// API INFO
// =========================
app.get("/api/info", (req, res) => {
    res.json({
        appName: "Student API",
        version: "1.0.0",
        author: "Masidah",
        description: "REST API untuk manajemen data mahasiswa"
    });
});


// =========================
// HEALTH CHECK
// =========================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "API berjalan normal",
        uptime: process.uptime(),
        timestamp: new Date(),
        environment: process.env.NODE_ENV || "development"
    });
});


// =========================
// HANDLER 404
// =========================
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan"
    });
});


// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.statusCode || 500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

module.exports = app;