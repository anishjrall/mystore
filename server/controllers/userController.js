const bcrypt = require("bcryptjs");
const users = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getUsers = async (req, res) => {
  const alluser = await users.find();
  res.json(alluser);
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      name,
      email,
      password: hashedpassword,
    });

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await users.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

module.exports = {
  getUsers,
  signup,
  login,
  profile,
};