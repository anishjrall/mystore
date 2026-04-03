import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import API from '../services/api'

export default function Products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products")
        setProducts(res.data)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin h-10 w-10 border-b-2 border-black rounded-full"></div>
      </div>
    )
  }


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">

      {/* Header */}
     <div className="flex justify-between items-start mb-8">
  
  <div>
    <h1 className="text-2xl md:text-3xl font-bold">
      All Products
    </h1>

    <p className="text-gray-500 text-sm mt-1">
      Browse our full collection
    </p>
  </div>

  <p className="text-gray-500 text-sm">
    {products.length} items
  </p>

</div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
          />
        ))}
      </div>

    </div>
  )
}