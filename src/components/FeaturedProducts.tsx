'use client'

import ProductCard from './ProductCard'

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

interface FeaturedProductsProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onViewProduct?: (product: Product) => void
}

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Automotive']

export default function FeaturedProducts({ 
  products, 
  onAddToCart, 
  selectedCategory, 
  onCategoryChange,
  onViewProduct
}: FeaturedProductsProps) {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 sm:px-4 py-2 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              onViewProduct={onViewProduct}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button 
            onClick={() => {
              // Simulate loading more products
              console.log('Loading more products...');
              // In a real app, this would fetch more products from an API
            }}
            className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Load More Products
          </button>
        </div>
      </div>
    </section>
  )
}
