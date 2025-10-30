'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import ProductModal from '@/components/ProductModal'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'

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
  description?: string
  specifications?: string[]
  shipping?: string
  condition?: string
  seller?: string
  location?: string
  timeLeft?: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max - Space Black',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1247,
    category: 'Electronics',
    badge: 'Best Seller',
    discount: 17,
    description: 'Apple MacBook Pro 16-inch with M3 Max chip, 36GB RAM, 1TB SSD. Perfect for professionals and creators.',
    specifications: ['M3 Max Chip', '36GB Unified Memory', '1TB SSD Storage', '16-inch Liquid Retina XDR Display'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Apple Store',
    location: 'Cupertino, CA',
    timeLeft: '2 days left'
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max - Natural Titanium',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2156,
    category: 'Electronics',
    badge: 'Hot Deal',
    discount: 8,
    description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.',
    specifications: ['A17 Pro Chip', '256GB Storage', 'Titanium Design', '48MP Main Camera'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Apple Store',
    location: 'Cupertino, CA',
    timeLeft: '1 day left'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra - Titanium Black',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1893,
    category: 'Electronics',
    badge: 'Trending',
    discount: 7,
    description: 'Samsung Galaxy S24 Ultra with S Pen, 200MP camera, and AI-powered features.',
    specifications: ['Snapdragon 8 Gen 3', '12GB RAM', '256GB Storage', 'S Pen Included'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Samsung Store',
    location: 'Seoul, South Korea',
    timeLeft: '3 days left'
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    price: 399,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 3247,
    category: 'Electronics',
    badge: 'Sale',
    discount: 20,
    description: 'Industry-leading noise canceling with 30-hour battery life and premium sound quality.',
    specifications: ['30-hour Battery', 'Industry-leading Noise Canceling', 'Quick Charge', 'Premium Sound'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Sony Store',
    location: 'Tokyo, Japan',
    timeLeft: '5 days left'
  },
  {
    id: 5,
    name: 'Nike Air Jordan 1 Retro High OG',
    price: 180,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 4567,
    category: 'Fashion',
    badge: 'Popular',
    discount: 18,
    description: 'Classic Air Jordan 1 in original colorway. Premium leather construction.',
    specifications: ['Premium Leather', 'Original Colorway', 'Air-Sole Unit', 'Rubber Outsole'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Nike Store',
    location: 'Beaverton, OR',
    timeLeft: '4 days left'
  },
  {
    id: 6,
    name: 'Dyson V15 Detect Cordless Vacuum',
    price: 649,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2891,
    category: 'Home',
    badge: 'Best Value',
    discount: 13,
    description: 'Advanced cordless vacuum with laser dust detection and powerful suction.',
    specifications: ['Laser Dust Detection', '60-minute Runtime', 'HEPA Filtration', 'Powerful Suction'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Dyson Store',
    location: 'Malmesbury, UK',
    timeLeft: '6 days left'
  },
  {
    id: 7,
    name: 'Tesla Model 3 Accessories Bundle',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 1234,
    category: 'Automotive',
    badge: 'Bundle',
    discount: 25,
    description: 'Complete accessory bundle for Tesla Model 3 including floor mats, console organizer, and more.',
    specifications: ['Floor Mats', 'Console Organizer', 'Screen Protector', 'Cup Holders'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Tesla Store',
    location: 'Palo Alto, CA',
    timeLeft: '7 days left'
  },
  {
    id: 8,
    name: 'Apple Watch Series 9 - GPS + Cellular',
    price: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 3456,
    category: 'Electronics',
    badge: 'Latest',
    discount: 17,
    description: 'Apple Watch Series 9 with GPS + Cellular, health monitoring, and fitness tracking.',
    specifications: ['GPS + Cellular', 'Health Monitoring', 'Fitness Tracking', '18-hour Battery'],
    shipping: 'Free shipping',
    condition: 'New',
    seller: 'Apple Store',
    location: 'Cupertino, CA',
    timeLeft: '2 days left'
  }
]

const categories = [
  { name: 'Electronics', icon: '📱', count: 1250, color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop' },
  { name: 'Fashion', icon: '👕', count: 890, color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop' },
  { name: 'Home & Garden', icon: '🏠', count: 650, color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
  { name: 'Sports', icon: '⚽', count: 420, color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop' },
  { name: 'Beauty', icon: '💄', count: 380, color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop' },
  { name: 'Books', icon: '📚', count: 290, color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' }
]

const brands = [
  { name: 'Apple', count: 250, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop' },
  { name: 'Samsung', count: 180, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' },
  { name: 'Nike', count: 150, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
  { name: 'Sony', count: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { name: 'Adidas', count: 110, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
  { name: 'LG', count: 95, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' }
]

// Products-specific slider using product images
const productsSlides = [
  {
    id: 1,
    title: 'Premium Apple Products',
    subtitle: 'Innovation at its finest',
    description: 'MacBook Pro M3 Max and iPhone 15 Pro - Professional tools for creators',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Apple',
    buttonLink: '#apple'
  },
  {
    id: 2,
    title: 'Samsung Galaxy Collection',
    subtitle: 'Android excellence',
    description: 'Galaxy S24 Ultra with S Pen - Power and productivity combined',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Samsung',
    buttonLink: '#samsung'
  },
  {
    id: 3,
    title: 'Professional Audio',
    subtitle: 'Sony sound perfection',
    description: 'WH-1000XM5 Noise Canceling Headphones - Immersive audio experience',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Audio',
    buttonLink: '#audio'
  },
  {
    id: 4,
    title: 'Gaming & Entertainment',
    subtitle: 'Level up your experience',
    description: 'Premium gaming gear and entertainment systems for enthusiasts',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Gaming',
    buttonLink: '#gaming'
  },
  {
    id: 5,
    title: 'Smart Home Technology',
    subtitle: 'Connected living',
    description: 'Transform your home with smart devices and IoT solutions',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Smart Home',
    buttonLink: '#smarthome'
  }
]

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid')
  const [notifications, setNotifications] = useState<string[]>([])
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    
    setNotifications(prev => [...prev, `${product.name} added to cart!`])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const showProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const filterProductsByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setSearchQuery('')
  }

  const filterProductsByBrand = (brandName: string) => {
    setSelectedBrand(brandName)
    setSearchQuery('')
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesBrand = selectedBrand === 'All' || product.seller?.includes(selectedBrand)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Slider */}
      <HeroSlider slides={productsSlides} />

      {/* Categories Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => filterProductsByCategory(category.name)}
              >
                <div className="bg-blue-50 rounded-2xl p-2 sm:p-3 text-center border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Circular Category Logo Container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-1">
                    {/* Outer Circle with Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-110 transition-transform duration-300">
                      {/* Inner Circle with Category Image */}
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Floating Category Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {category.count}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-xs group-hover:text-blue-600 transition-colors duration-200 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium">
                    {category.count.toLocaleString()} items
                  </p>
                  
                  {/* Hover Effect Button */}
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Browse
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Sort Section */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Brand:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand.name} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-24"
                />
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort and View */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand.name} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {filteredProducts.length} Products Found
            </h2>
            <div className="text-sm text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" 
            : "space-y-4"
          }>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onViewProduct={showProduct}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Shop by Brand</h2>
            <p className="text-gray-600">Discover products from your favorite brands</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => filterProductsByBrand(brand.name)}
              >
                <div className="bg-blue-50 rounded-2xl p-2 sm:p-3 text-center border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Circular Brand Logo Container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-1">
                    {/* Outer Circle with Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-110 transition-transform duration-300">
                      {/* Inner Circle with Brand Image */}
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-xl">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Floating Brand Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {brand.count}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-xs group-hover:text-blue-600 transition-colors duration-200 mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium">
                    {brand.count} products
                  </p>
                  
                  {/* Hover Effect Button */}
                  <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-slide-in"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {notification}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  )
}
