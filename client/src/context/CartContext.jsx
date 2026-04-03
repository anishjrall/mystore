import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");
        setCart(res.data);
      } catch (error) {
        console.error("Cart fetch error:", error);
      }
    };

    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }

  }, [user]);

  const addToCart = async (id) => {
    if (!user) throw new Error("Not logged in");

    try {
      const res = await API.post("/cart", {
        productId: id
      });
      setCart(res.data);
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (id) => {
    if (!user) throw new Error("Not logged in");

    try {
      const res = await API.delete("/cart/removeone", {
        data: { productId: id }
      });

      setCart(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = () => {
    setCart([])
  }
  const removeItem = async (id) => {
    if (!user) throw new Error("Not logged in");

    try {
      const res = await API.delete("/cart/remove", {
        data: { productId: id }
      });

      setCart(res.data);

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CartContext.Provider
      value={{ cart,clearCart, addToCart, removeFromCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};