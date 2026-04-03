const express = require("express");
const router = express.Router();

const { getProducts ,postProducts, getProductById } = require("../controllers/productController");

router.get("/", getProducts);
router.post("/",postProducts);
router.get("/:id",getProductById);
module.exports = router;
