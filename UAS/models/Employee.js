const db = require("../config/database");

class Employee {
  static async all() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO employees SET ?", data, (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, ...data });
      });
    });
  }

  static async find(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      db.query("UPDATE employees SET ? WHERE id = ?", [data, id], (err, results) => {
        if (err) return reject(err);
        resolve({ id, ...data });
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Employee;