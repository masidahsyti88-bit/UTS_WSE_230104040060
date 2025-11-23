import { students } from "../data/students.js";

// GET ALL
export const getAllStudents = (req, res) => {
    res.status(200).json({
        success: true,
        data: students
    });
};

// GET BY ID
export const getStudentById = (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            status: 404,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
};

// POST (ADD NEW)
export const addStudent = (req, res) => {
    const { name, npm, major } = req.body;

    if (!name || !npm || !major) {
        return res.status(400).json({
            status: 400,
            message: "name, npm, major wajib diisi"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        npm,
        major
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        data: newStudent
    });
};

// UPDATE
export const updateStudent = (req, res) => {
    const id = Number(req.params.id);
    const { name, npm, major } = req.body;

    const idx = students.findIndex(s => s.id === id);

    if (idx === -1) {
        return res.status(404).json({
            status: 404,
            message: "Student not found"
        });
    }

    students[idx] = {
        id,
        name: name || students[idx].name,
        npm: npm || students[idx].npm,
        major: major || students[idx].major
    };

    res.status(200).json({
        message: "Student updated",
        data: students[idx]
    });
};

// DELETE
export const deleteStudent = (req, res) => {
    const id = Number(req.params.id);
    const idx = students.findIndex(s => s.id === id);

    if (idx === -1) {
        return res.status(404).json({
            status: 404,
            message: "Student not found"
        });
    }

    students.splice(idx, 1);

    res.status(204).send();
};