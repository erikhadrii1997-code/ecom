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

// Sports products from Foleja.com
const sportsProducts = [
  {
    id: 1,
    name: 'Adidas Real Madrid Men\'s Jersey - White Star',
    price: 89,
    originalPrice: 109,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ce/64/fd/1730372151/maice-per-meshkuj-adidas-real-madrid-e-bardhe-yll-200004371-0.webp',
    rating: 4.8,
    reviews: 234,
    category: 'Football',
    badge: 'Official',
    discount: 18
  },
  {
    id: 2,
    name: 'Adidas Tiro 24 Men\'s Football Shorts - Blue Star',
    price: 35,
    originalPrice: 45,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/9d/14/2a/1749735791/fanelle-futbolli-per-meshkuj-adidas-tiro-24-e-kalter-yll-200008590-0.webp',
    rating: 4.6,
    reviews: 187,
    category: 'Football',
    badge: 'Performance',
    discount: 22
  },
  {
    id: 3,
    name: 'Adidas Table 23 Jersey T-Shirt - Men\'s Training',
    price: 42,
    originalPrice: 55,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/b6/03/5a/1700621839/t-shirt-adidas-table-23-jersey-m-h44529-bsw-200018865-1.webp',
    rating: 4.5,
    reviews: 156,
    category: 'Training',
    badge: 'Comfort',
    discount: 24
  },
  {
    id: 4,
    name: 'Dunlop Water Bottle with Handle 750ml - Sports Hydration',
    price: 18,
    originalPrice: 25,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/f7/5d/4d/1706709896/dunlop-water-bottle-with-handle-275085-bsw-200038266-1.webp',
    rating: 4.4,
    reviews: 98,
    category: 'Accessories',
    badge: 'Essential',
    discount: 28
  },
  {
    id: 5,
    name: 'Lamart Thermos LT4066 - Green Bottle 500ml',
    price: 32,
    originalPrice: 42,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=1600,width=1600/media/69/65/51/1757516108/termos-lamart-lt4066-bande-500ml-hiri-e-erret-pck-200000514-0.webp',
    rating: 4.7,
    reviews: 145,
    category: 'Drinkware',
    badge: 'Premium',
    discount: 24
  },
  {
    id: 6,
    name: 'Zwilling Thermo Jug with Mug 1 Liter - White',
    price: 65,
    originalPrice: 85,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/20/e9/dc/1683375474/thermo-jug-with-a-mug-zwilling-thermo-1-liter-white-acn-300003788-5.webp',
    rating: 4.8,
    reviews: 203,
    category: 'Drinkware',
    badge: 'Quality',
    discount: 24
  },
  {
    id: 7,
    name: 'Nike Dri-FIT Training Shorts - Black Performance',
    price: 38,
    originalPrice: 49,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/de/84/g0/1742569750/atlete-per-meshkuj-calvin-klein-jeans-te-zeza-yll-200007694-0.webp',
    rating: 4.5,
    reviews: 167,
    category: 'Training',
    badge: 'Bestseller',
    discount: 22
  },
  {
    id: 8,
    name: 'Adidas Football Cleats - Professional Grade',
    price: 125,
    originalPrice: 155,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/18/5e/c8/1754986411/atlete-per-meshkuj-tommy-hilfiger-te-zeza-yll-200009280-0.webp',
    rating: 4.9,
    reviews: 289,
    category: 'Football',
    badge: 'Pro',
    discount: 19
  },
  {
    id: 9,
    name: 'Under Armour Training Gloves - Workout Essential',
    price: 28,
    originalPrice: 35,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/3d/f2/15/1721824328/kapele-baseball-nike-e-bardhe-yll-200003423-0.webp',
    rating: 4.6,
    reviews: 134,
    category: 'Accessories',
    badge: 'Grip',
    discount: 20
  },
  {
    id: 10,
    name: 'Puma Gym Bag - Large Sports Duffel',
    price: 55,
    originalPrice: 75,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ea/a2/d1/1754665196/collistar-self-tanning-concentrate-body-legs-magic-drops-125ml-bts-200006525-0.webp',
    rating: 4.4,
    reviews: 98,
    category: 'Accessories',
    badge: 'Spacious',
    discount: 27
  }
]

// Sports categories
const sportsCategories = [
  {
    name: 'Football',
    icon: '⚽',
    count: 156,
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
  },
  {
    name: 'Training',
    icon: '🏋️',
    count: 234,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    name: 'Accessories',
    icon: '🎽',
    count: 189,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
  },
  {
    name: 'Drinkware',
    icon: '🥤',
    count: 87,
    color: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop'
  },
  {
    name: 'Basketball',
    icon: '🏀',
    count: 134,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop'
  },
  {
    name: 'Running',
    icon: '🏃',
    count: 198,
    color: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop'
  }
]

// Sports hero slides
const sportsSlides = [
  {
    id: 1,
    title: 'Premium Sports Collection',
    subtitle: 'Gear up with professional-grade sports equipment',
    description: 'Discover top-quality sports gear from leading brands like Adidas, Nike, and more',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
    buttonText: 'Shop Sports',
    buttonLink: '#products'
  },
  {
    id: 2,
    title: 'Football Excellence',
    subtitle: 'Official jerseys and equipment for champions',
    description: 'Get the official Real Madrid jersey and professional football gear',
    image: 'https://images.unsplash.com/photo-1556778358-5e65c90b4d1b?w=1200&h=600&fit=crop',
    buttonText: 'Explore Football',
    buttonLink: '#categories'
  },
  {
    id: 3,
    title: 'Training Essentials',
    subtitle: 'Performance gear for serious athletes',
    description: 'Enhance your workout with professional training equipment and apparel',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    buttonText: 'Shop Training',
    buttonLink: '#featured'
  }
]

export default function SportPage() {
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
  const filteredProducts = sportsProducts.filter(product => {
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
      <HeroSlider slides={sportsSlides} />

      {/* Categories Section */}
      <CategoriesSection
        categories={sportsCategories}
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