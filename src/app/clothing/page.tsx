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

// Clothing products from Foleja.com
const clothingProducts = [
  {
    id: 1,
    name: 'Adidas Training Tracksuit - Blue Star',
    price: 89,
    originalPrice: 109,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/15/18/6e/1730298228/trenerka-per-meshkuj-adidas-te-kalterta-yll-200004360-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/3d/f2/15/1721824328/kapele-baseball-nike-e-bardhe-yll-200003423-0.webp',
    rating: 4.8,
    reviews: 156,
    category: 'Caps',
    badge: 'Best Seller',
    discount: 22
  },
  {
    id: 3,
    name: 'Calvin Klein Jeans T-Shirt - Black Star',
    price: 45,
    originalPrice: 59,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/de/84/g0/1742569750/atlete-per-meshkuj-calvin-klein-jeans-te-zeza-yll-200007694-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/18/5e/c8/1754986411/atlete-per-meshkuj-tommy-hilfiger-te-zeza-yll-200009280-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/9d/14/2a/1749735791/fanelle-futbolli-per-meshkuj-adidas-tiro-24-e-kalter-yll-200008590-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/15/18/6e/1730298228/trenerka-per-meshkuj-adidas-te-kalterta-yll-200004360-0.webp',
    rating: 4.6,
    reviews: 142,
    category: 'Hoodies',
    badge: 'Trending',
    discount: 18
  },
  {
    id: 7,
    name: 'Puma Track Pants - Navy Blue',
    price: 65,
    originalPrice: 85,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/b6/03/5a/1700621839/t-shirt-adidas-table-23-jersey-m-h44529-bsw-200018865-1.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ce/64/fd/1730372151/maice-per-meshkuj-adidas-real-madrid-e-bardhe-yll-200004371-0.webp',
    rating: 4.8,
    reviews: 298,
    category: 'Shoes',
    badge: 'Hot Deal',
    discount: 16
  }
]

// Clothing categories
const clothingCategories = [
  {
    name: 'T-Shirts',
    icon: '👕',
    count: 125,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
  },
  {
    name: 'Tracksuits',
    icon: '🏃',
    count: 89,
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop'
  },
  {
    name: 'Caps',
    icon: '🧢',
    count: 67,
    color: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop'
  },
  {
    name: 'Hoodies',
    icon: '👘',
    count: 78,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop'
  },
  {
    name: 'Sneakers',
    icon: '👟',
    count: 156,
    color: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
  },
  {
    name: 'Shorts',
    icon: '🩳',
    count: 94,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop'
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