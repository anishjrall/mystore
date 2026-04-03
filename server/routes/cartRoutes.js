const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { 
  postCart,
  getCart,
  removeItem,
  removeFromCart
} = require("../controllers/cartController")

router.post("/", auth, postCart)
router.get("/", auth, getCart)
router.delete("/remove", auth, removeItem)          
router.delete("/removeone", auth, removeFromCart)  

module.exports = router