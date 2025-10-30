'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import HeroSlider from '@/components/HeroSlider'
import CategoriesSection from '@/components/CategoriesSection'
import FeaturedProducts from '@/components/FeaturedProducts'

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
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
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
    id: 8,
    name: 'Tesla Model 3',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 234,
    category: 'Automotive',
    badge: 'Eco-Friendly',
    discount: 10
  }
]

// Home page slider using product images
const homeSlides = [
  {
    id: 1,
    title: 'Premium Apple MacBook Pro',
    subtitle: 'Professional power unleashed',
    description: 'MacBook Pro 16" with M3 chip - Perfect for professionals and creators',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop MacBook',
    buttonLink: '#electronics'
  },
  {
    id: 2,
    title: 'Latest iPhone 15 Pro',
    subtitle: 'Innovation in your pocket',
    description: 'Experience the future with iPhone 15 Pro featuring advanced cameras and A17 Pro chip',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop iPhone',
    buttonLink: '#electronics'
  },
  {
    id: 3,
    title: 'Sony Premium Audio',
    subtitle: 'Immersive sound experience',
    description: 'Sony WH-1000XM5 - Industry-leading noise canceling headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Audio',
    buttonLink: '#electronics'
  },
  {
    id: 4,
    title: 'Nike Air Max Collection',
    subtitle: 'Step into comfort',
    description: 'Nike Air Max 270 - Comfort, style, and performance in every step',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Nike',
    buttonLink: '#fashion'
  },
  {
    id: 5,
    title: 'Tesla Electric Revolution',
    subtitle: 'Sustainable luxury',
    description: 'Tesla Model 3 - Electric performance meets sustainable luxury',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=600&fit=crop&crop=center&q=80',
    buttonText: 'Shop Tesla',
    buttonLink: '#automotive'
  }
]

const categories = [
  { name: 'Electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop', count: 1247, color: 'bg-blue-500' },
  { name: 'Fashion', icon: '👕', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop', count: 892, color: 'bg-pink-500' },
  { name: 'Home & Garden', icon: '🏠', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop', count: 634, color: 'bg-green-500' },
  { name: 'Sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', count: 456, color: 'bg-orange-500' },
  { name: 'Beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop', count: 789, color: 'bg-purple-500' },
  { name: 'Books', icon: '📚', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop', count: 234, color: 'bg-yellow-500' },
  { name: 'Toys', icon: '🧸', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', count: 567, color: 'bg-red-500' },
  { name: 'Automotive', icon: '🚗', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=200&fit=crop', count: 123, color: 'bg-gray-500' }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
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
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Hero Slider */}
      <HeroSlider slides={homeSlides} />

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