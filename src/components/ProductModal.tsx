'use client'

import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: string
  discount?: number
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onAddToCart: (product: Product) => void
}

export default function ProductModal({ isOpen, onClose, product, onAddToCart }: ProductModalProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!isOpen || !product) return null

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = () => {
    onAddToCart(product)
    onClose()
  }

  const images = [product.image, product.image, product.image, product.image]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[98vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{product.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 sm:p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Image Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    {product.badge}
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-full h-16 sm:h-20 object-cover rounded-md sm:rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-2 border-blue-500 ring-2 ring-blue-200' 
                        : 'border-2 border-transparent hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <span className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full font-semibold self-start">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs sm:text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{product.name}</h4>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm text-green-600 font-semibold">
                        Save ${(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-2 sm:space-y-3">
                <h5 className="text-base sm:text-lg font-semibold text-gray-900">Key Features</h5>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Premium quality materials
                  </li>
                  <li className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Excellent performance
                  </li>
                  <li className="flex items-center text-gray-600 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Outstanding durability
                  </li>
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all duration-200 font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 font-semibold ${
                      isWishlisted
                        ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100'
                        : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    console.log('Viewing full details for:', product.name);
                    onClose();
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
