'use client'

import { useState } from 'react'

// Type definitions
interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
}

interface CartItem extends Product {
  quantity: number
}

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 89
    }
  ]

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">E-Shop</h1>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Shop the Latest Tech
          </h2>
          <p className="text-xl mb-8">
            Discover amazing products at unbeatable prices
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Shopping Cart</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-600">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}