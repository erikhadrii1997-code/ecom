'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import HeroSlider from '@/components/HeroSlider'
import CategoriesSection from '@/components/CategoriesSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import ProductModal from '@/components/ProductModal'

// Type definitions
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

interface CartItem extends Product {
  quantity: number
}

const products = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    badge: 'Best Seller',
    discount: 17
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 89,
    category: 'Electronics',
    badge: 'New',
    discount: 9
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'Electronics',
    badge: 'Premium',
    discount: 11
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 156,
    category: 'Fashion',
    badge: 'Trending',
    discount: 17
  },
  {
    id: 5,
    name: 'Samsung 4K TV',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 78,
    category: 'Electronics',
    badge: 'Sale',
    discount: 19
  },
  {
    id: 6,
    name: 'Apple Watch Series 9',
    price: 399,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 92,
    category: 'Electronics',
    badge: 'Smart',
    discount: 7
  },
  {
    id: 7,
    name: 'Dyson V15 Vacuum',
    price: 649,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 67,
    category: 'Home',
    badge: 'Innovation',
    discount: 13
  },
  {
    id: 9,
    name: 'Samsung 65" QLED TV',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'Electronics',
    badge: 'QLED',
    discount: 19
  },
  {
    id: 10,
    name: 'Designer Handbag - Leather',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 145,
    category: 'Fashion',
    badge: 'Luxury',
    discount: 25
  },
  {
    id: 11,
    name: 'Gaming Chair - Ergonomic',
    price: 449,
    originalPrice: 549,
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 234,
    category: 'Home',
    badge: 'Ergonomic',
    discount: 18
  },
  {
    id: 12,
    name: 'Wireless Earbuds Pro',
    price: 249,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 345,
    category: 'Electronics',
    badge: 'Pro Audio',
    discount: 17
  },
  {
    id: 13,
    name: 'Fitness Tracker - Waterproof',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 278,
    category: 'Electronics',
    badge: 'Health',
    discount: 20
  },
  {
    id: 14,
    name: 'Coffee Machine - Espresso',
    price: 599,
    originalPrice: 749,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 167,
    category: 'Home',
    badge: 'Barista',
    discount: 20
  },
  {
    id: 15,
    name: 'Professional Camera - DSLR',
    price: 1799,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 123,
    category: 'Electronics',
    badge: 'Professional',
    discount: 18
  },
  {
    id: 16,
    name: 'Samsung 65" 4K Smart TV',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 234,
    category: 'Electronics',
    badge: '4K Ultra',
    discount: 25
  },
  {
    id: 17,
    name: 'Designer Leather Handbag',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'Fashion',
    badge: 'Luxury',
    discount: 25
  },
  {
    id: 18,
    name: 'PlayStation 5 Console',
    price: 699,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 567,
    category: 'Gaming',
    badge: 'Next Gen',
    discount: 13
  },
  {
    id: 19,
    name: 'MacBook Pro M3 - 14 inch',
    price: 1999,
    originalPrice: 2399,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 345,
    category: 'Electronics',
    badge: 'M3 Chip',
    discount: 17
  },
  {
    id: 20,
    name: 'Nike Air Jordan Retro Sneakers',
    price: 179,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 456,
    category: 'Fashion',
    badge: 'Retro',
    discount: 19
  },
  {
    id: 21,
    name: 'Winter Hoodie - Fleece Lined',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 278,
    category: 'Hoodies',
    badge: 'Warm',
    discount: 20
  },
  {
    id: 23,
    name: 'Tommy Hilfiger Polo Shirt',
    price: 69,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'Shirts',
    badge: 'Polo',
    discount: 22
  },
  {
    id: 24,
    name: 'Luxury Lipstick Set - 12 Shades',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 234,
    category: 'Makeup',
    badge: 'Luxury',
    discount: 20
  },
  {
    id: 25,
    name: 'Swimming Goggles - Competition Grade',
    price: 29,
    originalPrice: 39,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 167,
    category: 'Swimming',
    badge: 'Anti-Fog',
    discount: 26
  },
  {
    id: 26,
    name: 'Nike Dri-FIT Training Tank - Women',
    price: 39,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 234,
    category: 'Training',
    badge: 'Dri-FIT',
    discount: 20
  },
  {
    id: 27,
    name: 'Yoga Mat Premium - 6mm Thickness',
    price: 55,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 278,
    category: 'Fitness',
    badge: 'Eco-Friendly',
    discount: 20
  },
  {
    id: 28,
    name: 'Modern Dining Table Set',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 156,
    category: 'Furniture',
    badge: 'Modern',
    discount: 25
  },
  {
    id: 29,
    name: 'Wireless Gaming Headset',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 345,
    category: 'Gaming',
    badge: 'Wireless',
    discount: 20
  },
  {
    id: 30,
    name: 'Smart Fitness Watch',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 234,
    category: 'Wearables',
    badge: 'Smart',
    discount: 25
  }
]

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop', count: 1247, color: 'bg-blue-500' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop', count: 892, color: 'bg-pink-500' },
  { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop', count: 634, color: 'bg-green-500' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', count: 456, color: 'bg-orange-500' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop', count: 789, color: 'bg-purple-500' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop', count: 234, color: 'bg-yellow-500' },
  { name: 'Toys', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', count: 567, color: 'bg-red-500' },
  { name: 'Automotive', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=200&fit=crop', count: 123, color: 'bg-gray-500' }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Amazing selection and lightning-fast delivery! The quality is outstanding and the customer service is top-notch.'
  },
  {
    name: 'Mike Chen',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'I\'ve been shopping here for years. The best prices, authentic products, and excellent support. Highly recommended!'
  },
  {
    name: 'Emily Davis',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'The fashion collection is incredible! Trendy, affordable, and always in stock. My go-to store for everything!'
  }
]

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [notifications, setNotifications] = useState<string[]>([])
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }, [cart])

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
    
    // Add notification
    setNotifications(prev => [...prev, `${product.name} added to cart!`])
    
    // Auto-remove notification after 3 seconds
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

  // Function to show specific product
  const showProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  // Function to filter products by category
  const filterProductsByCategory = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setSearchQuery('')
    // Scroll to featured products section
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Function to show products by brand
  const showBrandProducts = (brandName: string) => {
    setSelectedCategory(brandName)
    setSearchQuery('')
    // Scroll to featured products section
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' })
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const filteredProducts = products.filter(product => {
    if (!searchQuery) {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      return matchesCategory
    }
    
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.badge && product.badge.toLowerCase().includes(searchLower))
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
  <div className="min-h-screen bg-gray-100">
      <Header 
        cartCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* eBay-style Trust Indicators */}
      <div className="bg-gray-50 py-4 sm:py-6 border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Buyer Protection</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Easy Returns</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <CategoriesSection 
        categories={categories} 
        onCategorySelect={filterProductsByCategory}
      />

      {/* Search Results Header */}
      {searchQuery && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-4 sm:mx-8 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <p className="text-blue-700 font-medium">
                Search results for &quot;{searchQuery}&quot;
              </p>
              <p className="text-blue-600 text-sm">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="ml-auto text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Clear search
            </button>
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div id="featured-products">
        <FeaturedProducts 
          products={filteredProducts} 
          onAddToCart={addToCart}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onViewProduct={showProduct}
        />
      </div>

      {/* Flash Deals Section - eBay Style */}
      <section className="py-8 sm:py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">Flash Deals</h2>
              <p className="text-sm sm:text-base text-gray-600">Limited time offers - Don&apos;t miss out!</p>
            </div>
            <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">Ends in 2h 15m</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <div key={index} className="bg-blue-50 rounded-lg border-2 border-red-200 p-4 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                    -{Math.floor(Math.random() * 50 + 20)}%
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-red-600">${(product.price * 0.7).toFixed(0)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories - Foleja Style */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trending Categories</h2>
            <p className="text-sm sm:text-base text-gray-600">Shop by popular categories</p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop", count: 1250, price: "From $29" },
              { name: "Fashion", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop", count: 890, price: "From $15" },
              { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", count: 650, price: "From $25" },
              { name: "Sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", count: 420, price: "From $35" },
              { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", count: 380, price: "From $12" },
              { name: "Books", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", count: 290, price: "From $8" }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-blue-200 rounded-xl p-4 sm:p-6 text-center border border-blue-300 hover:border-blue-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-between min-h-64 sm:min-h-72 md:min-h-80 h-auto">
                  <div className="relative z-10 flex flex-col items-center justify-between h-full">
                    <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden mx-auto mb-2 group-hover:scale-105 transition-transform duration-300 shadow-xl border-4 border-white bg-blue-100 flex items-center justify-center">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-base sm:text-lg group-hover:text-blue-700 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1 font-semibold">{category.count} products</p>
                    <p className="text-sm font-bold text-green-700 mb-1">{category.price}</p>
                    <button 
                      onClick={() => {
                        window.location.href = `/products?category=${encodeURIComponent(category.name)}`;
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-3 rounded-full hover:bg-blue-700 transition-all duration-200 font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Browse Category
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section - eBay Style */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Best Sellers</h2>
              <p className="text-gray-600">Top-rated products our customers love</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-bold flex items-center">
                    {product.rating}★
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <div className="text-sm text-gray-500">{product.reviews} reviews</div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section - Foleja Style */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
            <p className="text-gray-600">Fresh products just added to our store</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <div key={index} className="bg-blue-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
                    NEW
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <div className="text-sm text-gray-500">Free shipping</div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Deals Section - eBay Style */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Daily Deals</h2>
            <p className="text-blue-100">Today&apos;s best offers - Limited time only!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-gray-900 hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    DAILY DEAL
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-red-600">${(product.price * 0.6).toFixed(0)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                    <div className="text-xs text-gray-500">Save ${(product.price * 0.4).toFixed(0)}</div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands Section - Foleja Style */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Brands</h2>
            <p className="text-sm sm:text-base text-gray-600">Shop from your favorite brands</p>
          </div>
          
  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {[
            {
              name: "Apple",
              image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
              products: "1,250+ products",
              price: "From $199"
            },
            {
              name: "Samsung",
              image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
              products: "980+ products",
              price: "From $149"
            },
            {
              name: "Nike",
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
              products: "750+ products",
              price: "From $45"
            },
            {
              name: "Sony",
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
              products: "650+ products",
              price: "From $99"
            },
            {
              name: "Adidas",
              image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
              products: "520+ products",
              price: "From $35"
            },
            {
              name: "LG",
              image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop",
              products: "380+ products",
              price: "From $299"
            }
          ].map((brand, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-blue-50 rounded-2xl p-2 sm:p-3 text-center border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Circular Brand Logo Container */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-2">
                    {/* Outer Circle with Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-105 transition-transform duration-300">
                      {/* Inner Circle with Brand Image */}
                      <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white shadow-xl">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    
                    {/* Floating Brand Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      {brand.products.split('+')[0]}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors duration-200 mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1 font-semibold">{brand.products}</p>
                  <p className="text-xs font-bold text-green-600 mb-1">{brand.price}</p>
                  
                  {/* Hover Effect Button */}
                  <div className="mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => {
                        showBrandProducts(brand.name);
                        setNotifications(prev => [...prev, `Browsing ${brand.name} products`]);
                        setTimeout(() => {
                          setNotifications(prev => prev.slice(1));
                        }, 3000);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Shop Now
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => {
                      showBrandProducts(brand.name);
                      // Show notification
                      setNotifications(prev => [...prev, `Viewing ${brand.name} products`]);
                      setTimeout(() => {
                        setNotifications(prev => prev.slice(1));
                      }, 3000);
                    }}
                    className="w-full bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-all duration-200 font-bold text-xs shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    View Products
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />


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
