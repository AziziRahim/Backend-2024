// models/User.js
const db = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  static async all() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      db.query("INSERT INTO users SET ?", { ...data, password: hashedPassword }, (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, ...data });
      });
    });
  }

  static async find(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      db.query("UPDATE users SET ? WHERE id = ?", [data, id], (err, results) => {
        if (err) return reject(err);
        resolve({ id, ...data });
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = User;