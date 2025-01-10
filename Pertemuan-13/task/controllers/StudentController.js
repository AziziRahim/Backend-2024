// import Model Student
const Student = require("../models/Student");

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.all();
      res.status(200).json({
        message: students.length > 0 ? "Menampilkan semua students" : "Students is empty",
        data: students,
      });
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async store(req, res) {
    const { nama, nim, email, jurusan } = req.body;

    if (!nama || !nim || !email || !jurusan) {
      return res.status(422).json({ message: "Semua data harus dikirim" });
    }

    try {
      const student = await Student.create(req.body);
      res.status(201).json({ message: "Menambahkan data student", data: student });
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const student = await Student.find(id);
      if (student) {
        const updatedStudent = await Student.update(id, req.body);
        res.status(200).json({ message: "Mengedit data student", data: updatedStudent });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const student = await Student.find(id);
      if (student) {
        await Student.delete(id);
        res.status(200).json({ message: "Menghapus data students" });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const student = await Student.find(id);
      if (student) {
        res.status(200).json({ message: "Menampilkan data student", data: student });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new StudentController();