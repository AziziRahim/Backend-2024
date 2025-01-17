// controllers/AuthController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      res.status(201).json({ message: "User  created successfully", data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isValidPassword = await User.isValidPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successfully", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new AuthController();