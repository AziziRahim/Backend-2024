// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * from students";
      db.query(query, (err, results) => {
          resolve(results);
      });
    });
  }

static async create(data, callback) {
  const sql = "INSERT INTO students SET ?";
  db.query(sql, data, (err, results) => {
    
    const id = results.insertId;
    const sql = "INSERT INTO student_details SET ?";
    db.query(sql, id, (err, results) => {
      callback(results);
    });
});

}
}

// export class Student
module.exports = Student;