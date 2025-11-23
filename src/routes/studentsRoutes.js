const express = require("express");
const router = express.Router();

// Data Dummy
let students = [
    { id: 1, name: "Budi", major: "Informatika" },
    { id: 2, name: "Siti", major: "Sistem Informasi" }
];

// GET semua data
router.get("/", (req, res) => {
    res.json({
        status: "success",
        data: students
    });
});

// GET by ID
router.get("/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan"
        });
    }
    res.json({
        status: "success",
        data: student
    });
});

// POST tambah data
router.post("/", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        major: req.body.major
    };
    students.push(newStudent);
    res.status(201).json({
        status: "success",
        message: "Data berhasil ditambahkan",
        data: newStudent
    });
});

// PUT update data
router.put("/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan"
        });
    }

    student.name = req.body.name || student.name;
    student.major = req.body.major || student.major;

    res.json({
        status: "success",
        message: "Data berhasil diupdate",
        data: student
    });
});

// DELETE data
router.delete("/:id", (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.json({
        status: "success",
        message: "Data berhasil dihapus"
    });
});

module.exports = router;