import React, { useContext, useMemo, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

  const { cart, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  }, [cart])


  const handlePlaceOrder = async () => {
    try {

      setLoading(true)

      // later connect backend
      await new Promise(res => setTimeout(res, 1000))

      clearCart()

      toast.success("Order placed successfully 🎉")

      navigate("/order-success")

    } catch (error) {
      toast.error("Order failed")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Products */}
        <div className="md:col-span-2 space-y-4">

          {cart.map(item => (
            <div
              key={item.product._id}
              className="bg-white flex items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >

              <div className="flex items-center gap-4">

                <div className="bg-gray-50 p-2 rounded-lg">
                  <img
                    src={`/images/${item.product.image}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

              </div>

              <p className="font-semibold">
                ₹{item.product.price * item.quantity}
              </p>

            </div>
          ))}

        </div>


        {/* Summary */}
        <div className="bg-white border rounded-xl p-5 shadow-sm h-fit sticky top-24">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-600">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">
                Free
              </span>
            </div>

          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition
  ${loading
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  )
}