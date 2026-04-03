const products = require("../models/products");

const getProducts = async (req, res) => {
  const product = await products.find();
  res.json(product);
};

const postProducts = async (req, res) => {
  const { name, price, image, description } = req.body;

  const product = await products.create({
    name,
    price,
    image,
    description,
  });

  res.json(product);
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await products.findById(id);
  res.json(product);
};

module.exports = {
  getProducts,
  postProducts,
  getProductById
};
