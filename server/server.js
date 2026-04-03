require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
const start = async () => {
  await connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

start();
