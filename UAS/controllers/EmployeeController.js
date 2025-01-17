const Employee = require("../models/Employee");

class EmployeeController {
  async index(req, res) {
    try {
      const employees = await Employee.all();
      res.status(200).json({
        message: employees.length > 0 ? "Menampilkan semua employees" : "Employees is empty",
        data: employees,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Resource not found" });
    }
  }

  async store(req, res) {
    try {
      const { nama_pegawai, jenis_kelamin_pegawai, no_hp_pegawai, alamat_pegawai, email_pegawai, status_pegawai, tanggal_masuk_kerja } = req.body;

      if (!nama_pegawai || !jenis_kelamin_pegawai || !no_hp_pegawai || !alamat_pegawai || !email_pegawai || !status_pegawai || !tanggal_masuk_kerja) {
        return res.status(204).json({ message: "Semua data harus dikirim" });
      }

      const employee = await Employee.create(req.body);
      res.status(201).json({ message: "Menambahkan data employee", data: employee });
    } catch (err) {
      console.error(err);
      res.status(422).json({ message: "gagal ditambahkan" });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const employee = await Employee.find(id);
      if (!employee) {
        res.status(404).json({ message: "Employee tidak ditemukan" });
      } else {
        res.status(200).json({
          message: "Menampilkan employee",
          data: employee,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const employee = await Employee.update(id, req.body);
      res.status(200).json({
        message: "Employee berhasil diupdate",
        data: employee,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await Employee.delete(id);
      res.status(200).json({ message: "Employee berhasil dihapus" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async search(req, res) {
    try {
      const name = req.params.name;
      const employees = await Employee.all();
      const result = employees.filter((employee) => employee.nama_pegawai.includes(name));
      res.status(200).json({
        message: result.length > 0 ? "Menampilkan hasil pencarian" : "Tidak ada hasil pencarian",
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async active(req, res) {
    try {
      const employees = await Employee.all();
      const activeEmployees = employees.filter((employee) => employee.status_pegawai === "active");
      res.status(200).json({
        message: activeEmployees.length > 0 ? "Menampilkan employees aktif" : "Tidak ada employees aktif",
        data: activeEmployees,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async inactive(req, res) {
    try {
      const employees = await Employee.all();
      const inactiveEmployees = employees.filter((employee) => employee.status_pegawai === "inactive");
      res.status(200).json({
        message: inactiveEmployees.length > 0 ? "Menampilkan employees tidak aktif" : "Tidak ada employees tidak aktif",
        data: inactiveEmployees,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }

  async terminated(req, res) {
    try {
      const employees = await Employee.all();
      const terminatedEmployees = employees.filter((employee) => employee.status_pegawai === "terminated");
      res.status(200).json({
        message: terminatedEmployees.length > 0 ? "Menampilkan employees yang dipecat" : "Tidak ada employees yang dipecat",
        data: terminatedEmployees,
      });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new EmployeeController();