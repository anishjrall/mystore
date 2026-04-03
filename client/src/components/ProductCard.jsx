import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`}>
      
      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer">

        {/* Image */}
        <div className="h-52 flex items-center justify-center bg-gray-50 rounded-xl mb-4">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="h-full object-contain transition hover:scale-105"
          />
        </div>

        {/* Name */}
        <h2 className="text-[15px] font-medium text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h2>

        {/* Price */}
        <p className="text-lg font-semibold text-black">
          ₹{product.price}
        </p>

      </div>

    </Link>
  )
}