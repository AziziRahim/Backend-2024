// import database
const db = require("../config/database");

// Model Student
class Student {
  static all() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from students", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      db.query("INSERT INTO students SET ?", data, (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      });
    });
    return this.find(id);
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from students WHERE id = ?", id, (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      db.query("UPDATE students SET ? WHERE id = ?", [data, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
    return this.find(id);
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM students WHERE id = ?", id, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Student;