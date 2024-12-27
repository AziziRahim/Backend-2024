// import Model Student
const Student = require("../models/Student");

class StudentController {
  async index(req, res) {
    const students = await Student.all();

    const data = {
      message: "Menampilkan semua students",
      data: students,
    };

    res.json(data);
  }

  async store(req, res) {
    await Student.create(req.body, (student) => {

      const data = {
        message: "Menambahkan data student",
        data: student,
    };
    
    res.status(201).json(data);
  });
  }

 
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;