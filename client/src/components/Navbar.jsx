import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
    FiHome,
    FiSearch,
    FiShoppingCart,
    FiUser
} from "react-icons/fi";

export default function Navbar() {

    const { cart } = useContext(CartContext)
    const location = useLocation()

    const isActive = (path) =>
        location.pathname === path ? "text-black" : "text-gray-500"

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex justify-between items-center px-6 py-4 shadow-sm bg-white">
                <h1 className="text-xl font-bold">
                    MyStore
                </h1>

                <div className="flex gap-6">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>


            {/* Mobile Top Brand */}
            <div className="md:hidden bg-white px-4 py-3 shadow-sm sticky top-0 z-50 flex justify-between items-center">

                <h1 className="text-xl font-bold">
                    MyStore
                </h1>

                <div className="flex gap-4">

                    <Link to="/products">
                        <FiSearch size={22} />
                    </Link>

                    <Link to="/cart" className="relative">
                        <FiShoppingCart size={22} />

                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-black text-white text-xs px-1 rounded-full">
                                {cart.length}
                            </span>
                        )}

                    </Link>

                </div>

            </div>


            {/* Mobile Bottom Navbar */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-50">

                <div className="flex justify-around py-3">

                    <Link
                        to="/"
                        className={`flex flex-col items-center text-sm ${isActive("/")}`}
                    >
                        <FiHome size={22} />
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className={`flex flex-col items-center text-sm ${isActive("/products")}`}
                    >
                        <FiSearch size={22} />
                        Shop
                    </Link>

                    <Link
                        to="/cart"
                        className={`flex flex-col items-center text-sm relative ${isActive("/cart")}`}
                    >
                        <FiShoppingCart size={22} />
                        Cart

                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-black text-white text-xs px-1 rounded-full">
                                {cart.length}
                            </span>
                        )}

                    </Link>

                    <Link
                        to="/profile"
                        className={`flex flex-col items-center text-sm ${isActive("/profile")}`}
                    >
                        <FiUser size={22} />
                        Profile
                    </Link>

                </div>

            </div>
        </>
    )
}