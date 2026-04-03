import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'
import { CartContext } from '../context/CartContext'
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';

export default function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${id}`)
      setProduct(res.data)
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart")
      return
    }

    if (loading) return

    try {
      setLoading(true)
      await addToCart(id, quantity)
      toast.success("Added to cart 🛒")
    } catch (err) {
      toast.error("Failed to add to cart")
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin h-10 w-10 border-b-2 border-black rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 mb-6 hover:text-black"
      >
        ← Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="max-h-[500px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">

          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-black mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">

            <span className="font-medium">
              Quantity:
            </span>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>

              <span className="px-5 py-2 font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>

            </div>

          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`w-full md:w-fit px-8 py-3 rounded-lg text-white font-semibold transition
            ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

        </div>

      </div>

    </div>
  )
}