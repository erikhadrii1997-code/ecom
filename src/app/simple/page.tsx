'use client'

import { useState } from 'react'

export default function SimplePage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Simple Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">🛒 E-Commerce Store</h1>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/products" className="text-gray-700 hover:text-blue-600">Products</a>
              <a href="/house" className="text-gray-700 hover:text-blue-600">House</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to Our Store</h2>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now (Clicked {count} times)
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "MacBook Pro 16\"",
                price: 2499,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
                rating: 4.8
              },
              {
                id: 2,
                name: "iPhone 15 Pro",
                price: 999,
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
                rating: 4.9
              },
              {
                id: 3,
                name: "Sony Headphones",
                price: 399,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                rating: 4.7
              }
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 E-Commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}