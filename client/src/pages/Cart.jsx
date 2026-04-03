import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function Cart() {

  const navigate = useNavigate()
  const { cart, removeFromCart, removeItem, addToCart } = useContext(CartContext)

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity
    }, 0)
  }, [cart])


  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Your Cart is Empty
        </h2>

        <button
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>
    )
  }


  return (
    <div className="max-w-6xl mx-auto mt-6 md:mt-10 p-3 md:p-4">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Your Cart
      </h1>

      <div className="space-y-5">

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="bg-white flex flex-col md:grid md:grid-cols-3 gap-4 items-center p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >

            {/* Product */}
            <div className="flex items-center gap-4 w-full">
              <div className="bg-gray-50 p-2 rounded-lg">
                <img
                  src={`/images/${item.product.image}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {item.product.name}
                </h2>

                <p className="text-gray-500">
                  ₹{item.product.price}
                </p>
              </div>
            </div>


            {/* Quantity */}
            <div className="flex justify-between md:justify-center w-full">

              <div className="flex items-center border rounded-lg overflow-hidden">

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>

                <span className="px-5 py-2 font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => addToCart(item.product._id)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>

              </div>

            </div>


            {/* Price */}
            <div className="flex justify-between md:block w-full text-right">

              <p className="font-semibold text-lg">
                ₹{item.product.price * item.quantity}
              </p>

              <button
                onClick={() => removeItem(item.product._id)}
                className="text-red-500 hover:text-red-700 text-sm mt-1"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>


      {/* Summary */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 justify-between items-center">

        <div>
          <p className="text-gray-500">
            Total Amount
          </p>

          <h2 className="text-2xl font-bold">
            ₹{total}
          </h2>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  )
}