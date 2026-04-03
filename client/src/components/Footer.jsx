import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">

      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            MyStore
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            Modern ecommerce application with authentication, cart functionality,
            and responsive UI built using MERN stack.
          </p>
        </div>


        {/* Project Info */}
        <div>
          <h3 className="font-semibold mb-2">
            Tech Stack
          </h3>

          <p className="text-gray-600 text-sm">
            React • Node.js • Express • MongoDB • Tailwind CSS
          </p>
        </div>

      </div>


      {/* Bottom */}
      <div className="border-t py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyStore — Developed by Anish Jrall
      </div>

    </footer>
  )
}