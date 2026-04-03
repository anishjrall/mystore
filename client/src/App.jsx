import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./protected/ProtectedRoute";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import OrderSuccess from "./pages/OrderSuccess"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">

      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar
        closeButton={false}
        newestOnTop
        pauseOnHover={false}
        draggable={false}
        style={{ top: "70px", right: "10px" }}
        toastStyle={{
          fontSize: "13px",
          padding: "8px 12px",
          borderRadius: "8px"
        }}
      />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <Footer />

    </div>
  )
}