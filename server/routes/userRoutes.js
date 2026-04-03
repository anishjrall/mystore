const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const {
  getUsers,
  signup,
  login,
  profile,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile",auth, profile);
module.exports = router;
