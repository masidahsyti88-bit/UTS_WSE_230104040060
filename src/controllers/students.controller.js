import { students } from "../data/students.data.js";

export const getStudents = (req, res) => {
    res.status(200).json({ status: "success", data: students });
};

export const getStudentById = (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).json({ status: "fail", message: "Data tidak ditemukan" });
    res.status(200).json({ status: "success", data: student });
};

export const createStudent = (req, res) => {
    const { name, npm, major } = req.body;

    if (!name || !npm || !major) {
        return res.status(400).json({
            status: "fail",
            message: "Field 'name', 'npm', dan 'major' wajib diisi"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        npm,
        major
    };

    students.push(newStudent);
    res.status(201).json({ status: "success", data: newStudent });
};

export const updateStudent = (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).json({ status: "fail", message: "Data tidak ditemukan" });

    const { name, npm, major } = req.body;
    if (!name || !npm || !major) {
        return res.status(400).json({
            status: "fail",
            message: "Semua field wajib diisi"
        });
    }

    student.name = name;
    student.npm = npm;
    student.major = major;

    res.status(200).json({ status: "success", data: student });
};

export const deleteStudent = (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Data tidak ditemukan"
        });
    }

    students.splice(index, 1);

    return res.status(200).json({
        status: "success",
        message: "Data berhasil dihapus"
    });
};