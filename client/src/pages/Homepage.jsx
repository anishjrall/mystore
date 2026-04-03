import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Homepage() {
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

    return (
        
        <div className='min-h-screen bg-gray-50'>
            {/* Hero Section */}
            <div className='bg-gradient-to-r from-black to-gray-800 text-white py-20 px-4'>
                <div className='max-w-6xl mx-auto text-center'>
                    <h1 className='text-3xl md:text-5xl font-bold mb-4'>
                        Streetwear That Speaks
                    </h1>

                    <p className='text-gray-300 mb-8 text-lg'>
                        Discover premium oversized, minimal & modern fits
                    </p>

                    <Link
                        to='/products'
                        className='bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition'
                    >
                        Shop Now
                    </Link>
                </div>
            </div>


            {/* Featured Products */}
            <div className='max-w-7xl mx-auto px-4 py-10'>

                <div className='flex justify-between items-center mb-8'>
                    <h2 className='text-2xl md:text-3xl font-bold'>
                        Featured Products
                    </h2>

                    <Link
                        to="/products"
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {products.slice(0,4).map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                )}

            </div>


        </div>
    )
}