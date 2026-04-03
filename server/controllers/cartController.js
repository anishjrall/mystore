const User = require("../models/user");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cart.product");

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;

      if (existingProduct.quantity <= 0) {
        user.cart = user.cart.filter(
          (item) => item.product.toString() !== productId,
        );
      }
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({
        product: productId,
        quantity: 1,
      });
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");

    res.status(201).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const user = await User.findById(userId);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();

    const updatedUser = await User
      .findById(userId)
      .populate("cart.product");

    res.status(200).json(updatedUser.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { removeItem, postCart, getCart, removeFromCart };
