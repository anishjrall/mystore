import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">

      <h1 className="text-3xl font-bold mb-3">
        Order Placed 
      </h1>

      <p className="text-gray-600 mb-6">
        Your order has been placed successfully
      </p>

      <button
        onClick={() => navigate("/products")}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </button>

    </div>
  )
}