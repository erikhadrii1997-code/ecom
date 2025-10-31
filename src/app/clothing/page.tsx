'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
const clothingCategories = [
  { name: 'Tracksuits', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', count: 12, color: 'bg-blue-500' },
  { name: 'Caps', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', count: 8, color: 'bg-yellow-500' },
  { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', count: 15, color: 'bg-green-500' },
  { name: 'Shorts', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', count: 7, color: 'bg-red-500' },
  { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop', count: 10, color: 'bg-purple-500' },
  { name: 'Pants', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', count: 9, color: 'bg-pink-500' },
  { name: 'Shoes', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', count: 14, color: 'bg-indigo-500' },
  { name: 'Jeans', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', count: 6, color: 'bg-gray-500' },
  { name: 'Jackets', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop', count: 5, color: 'bg-orange-500' },
  { name: 'Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', count: 11, color: 'bg-teal-500' }
];
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

// Clothing products from Foleja.com
const clothingProducts = [
  {
    id: 1,
    name: 'Adidas Training Tracksuit - Blue Star',
    price: 89,
    originalPrice: 109,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 89,
    category: 'Tracksuits',
    badge: 'New Arrival',
    discount: 18
  },
  {
    id: 2,
    name: 'Nike Baseball Cap - White Star',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 156,
    category: 'Caps',
    badge: 'Trending',
    discount: 22
  },
  {
    id: 3,
    name: 'Calvin Klein Jeans T-Shirt - Black Star',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'T-Shirts',
    badge: 'Premium',
    discount: 24
  },
  {
    id: 4,
    name: 'Tommy Hilfiger T-Shirt - Black Star',
    price: 52,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 124,
    category: 'T-Shirts',
    badge: 'Popular',
    discount: 25
  },
  {
    id: 5,
    name: 'Nike Training Shorts - Dark Grey',
    price: 42,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 87,
    category: 'Shorts',
    badge: 'Summer Sale',
    discount: 24
  },
  {
    id: 6,
    name: 'Adidas Hoodie - Black Essential',
    price: 78,
    originalPrice: 95,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 142,
    category: 'Hoodies',
    badge: 'Essential',
    discount: 18
  },
  {
    id: 7,
    name: 'Puma Track Pants - Navy Blue',
    price: 65,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 76,
    category: 'Pants',
    discount: 24
  },
  {
    id: 8,
    name: 'Nike Sneakers - Air Max White',
    price: 125,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 298,
    category: 'Shoes',
    badge: '',
    discount: 16,
  },
  {
    id: 9,
    name: 'Designer Jeans - Slim Fit Blue',
    price: 89,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 234,
    category: 'Pants',
    badge: 'Premium',
    discount: 25
  },
  {
    id: 10,
    name: 'Casual Polo Shirt - Navy Blue',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 189,
    category: 'T-Shirts',
    badge: 'Comfort',
    discount: 24
  },
  {
    id: 11,
    name: 'Leather Jacket - Vintage Style',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 156,
    category: 'Jackets',
    badge: 'Vintage',
    discount: 25
  },
  {
    id: 12,
    name: 'Running Shorts - Quick Dry',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 167,
    category: 'Shorts',
    badge: 'Quick Dry',
    discount: 22
  },
  {
    id: 13,
    name: 'Baseball Cap - Logo Design',
    price: 29,
    originalPrice: 39,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    rating: 4.2,
    reviews: 145,
    category: 'Caps',
    badge: 'Logo',
    discount: 26
  },
  {
    id: 15,
    name: 'Dress Shirt - Formal White',
    price: 65,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 198,
    category: 'Shirts',
    badge: 'Formal',
    discount: 24
  },
  {
    id: 16,
    name: 'Sneakers - High-Top Canvas',
    price: 75,
    originalPrice: 95,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 189,
    category: 'Shoes',
    badge: 'Classic',
    discount: 21
  },
  {
    id: 17,
    name: 'Levi\'s 501 Original Jeans - Blue',
    price: 89,
    originalPrice: 109,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 456,
    category: 'Jeans',
    badge: 'Original',
    discount: 18
  },
  {
    id: 18,
    name: 'Nike Air Max 270 Sneakers',
    price: 139,
    originalPrice: 169,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 567,
    category: 'Shoes',
    badge: 'Air Max',
    discount: 18
  },
  {
    id: 19,
    name: 'Champion Hoodie - Logo Embroidered',
    price: 59,
    originalPrice: 79,
    image: 'https://cdn.shopify.com/s/files/1/0665/9001/5680/files/CPM253FH62_S143-FRONT.jpg?v=1759936608&width=500',
    rating: 4.5,
    reviews: 234,
    category: 'Hoodies',
    badge: 'Champion',
    discount: 25
  },
  {
    id: 20,
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
    id: 21,
    name: 'Adidas Tracksuit - Complete Set',
    price: 119,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 345,
    category: 'Tracksuits',
    badge: 'Complete',
    discount: 20
  },
  {
    id: 22,
    name: 'Calvin Klein T-Shirt - Premium Cotton',
    price: 39,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 278,
    category: 'T-Shirts',
    badge: 'Premium',
    discount: 20
  },
  {
    id: 23,
    name: 'Vans Old Skool Skateboard Shoes',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 456,
    category: 'Shoes',
    badge: 'Skate',
    discount: 20
  },
  {
    id: 24,
    name: 'North Face Fleece Hoodie - Glacier Blue',
    price: 82,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 312,
    category: 'Hoodies',
    badge: 'Fleece',
    discount: 17
  },
  {
    id: 25,
    name: 'Adidas Originals Hoodie - Black',
    price: 65,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 198,
    category: 'Hoodies',
    badge: 'Adidas',
    discount: 24
  }
]

// Clothing hero slides
const clothingSlides = [
  {
    id: 1,
    title: 'Premium Fashion Collection',
    subtitle: 'Discover the latest trends in men\'s fashion',
    description: 'Explore our curated selection of premium clothing from top international brands',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    buttonText: 'Shop Collection',
    buttonLink: '#products'
  },
  {
    id: 2,
    title: 'Sport & Casual Wear',
    subtitle: 'Performance meets style in our athletic collection',
    description: 'Find the perfect balance of comfort and style with our sportswear line',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
    buttonText: 'Explore Now',
    buttonLink: '#categories'
  },
  {
    id: 3,
    title: 'Street Style Essentials',
    subtitle: 'Urban fashion for the modern lifestyle',
    description: 'Get the latest street style trends and express your unique personality',
    image: 'https://images.unsplash.com/photo-1615404943009-47b0e9bdf4b0?w=1200&h=600&fit=crop',
    buttonText: 'Shop Now',
    buttonLink: '#featured'
  }
]

export default function ClothingPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState<string[]>([])

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
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })

    // Add notification
    setNotifications(prev => [...prev, `${product.name} added to cart!`])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 3000)
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const showProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  // Filter products based on search and category
  const filteredProducts = clothingProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

  {/* Hero Slider */}
  <HeroSlider slides={clothingSlides} />
  <div id="fashion" />

      {/* Categories Section */}
      <CategoriesSection
        categories={clothingCategories}
        onCategorySelect={handleCategorySelect}
      />

      {/* Featured Products */}
      <FeaturedProducts
        products={filteredProducts}
        onAddToCart={addToCart}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onViewProduct={showProduct}
      />

      {/* Footer */}
      <Footer />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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