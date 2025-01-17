// import EmployeeController
const EmployeeController = require('../controllers/EmployeeController');
// import express
const express = require("express");

// membuat object router
const router = express.Router();
const authenticate = require("../middleware/auth");

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello HRD API Express");
});

// Membuat routing employee
router.get("/employees", authenticate, EmployeeController.index);
router.post("/employees",authenticate, EmployeeController.store);
router.put("/employees/:id", authenticate,EmployeeController.update);
router.delete("/employees/:id", authenticate,EmployeeController.delete);
router.get("/employees/:id", authenticate,EmployeeController.show);
router.get("/employees/search/:name", authenticate,EmployeeController.search);
router.get("/employees/status/active", authenticate,EmployeeController.active);
router.get("/employees/status/inactive",authenticate, EmployeeController.inactive);
router.get("/employees/status/terminated", authenticate,EmployeeController.terminated);

// export router
module.exports = router;