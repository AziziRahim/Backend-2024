// TODO 3: Import data students dari folder data/students.js
// code here
const students = require('../data/students');



// Membuat Class StudentController
class StudentController {
  index(req, res) {
    const data = {
      message : "Menampilkan semua students",
      data : students,
    };
     

    res.json(data);
   
    }

  store(req, res) {
    // Mengambil data dari request body
    const { nama } = req.body;
    // Membuat objek baru
    students.push(nama);
    const data = {
      message : `Menambahkan data student: ${nama}`,
      data : students,
    };
    res.json(data);

    // TODO 5: Tambahkan data students
    // code here
  }

  update(req, res) {
    // Mengambil id dari parameter
    const { id } = req.params;
    const { nama } = req.body;

    // Mengupdate data di index
    students[id] = nama;

    const data = {
      message : `Mengupdate student id ${id}, nama ${nama}`,
      data : students,
      };

      // Mengirimkan response
      res.status(200).json(data);
    // TODO 6: Update data students
    // code here
  }

  destroy(req, res) {
    const { id } = req.params;

    // Menghapus data siswa dari array
    if (students[id]) {
        const deletedStudent = students.splice(id, 1);
        return res.status(200).json({
            message: `Menghapus student id ${id}`,
            data: students,
        });
    }

    // Jika ID tidak valid
    res.status(404).json({ message: "Student tidak ditemukan" });
}
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
