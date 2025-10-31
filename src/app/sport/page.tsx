
'use client'
// ...existing code...
// Set main background and sections to solid gray colors

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
    name: 'Nike Air Jordan Basketball Shoes - High Top',
    price: 189,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    category: 'Basketball',
    badge: 'Premium',
    discount: 18
  },
  {
    id: 2,
    name: 'Professional Tennis Racket - Carbon Fiber',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'Tennis',
    badge: 'Pro Grade',
    discount: 22
  },
  {
    id: 3,
    name: 'Premium Yoga Mat - Eco Friendly',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 156,
    category: 'Fitness',
    badge: 'Eco-Friendly',
    discount: 24
  },
  {
    id: 6,
    name: 'Swimming Pool Equipment Set',
    price: 149,
    originalPrice: 189,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 203,
    category: 'Drinkware',
    badge: 'Professional',
    discount: 24
  },
  {
    id: 7,
    name: 'Nike Dri-FIT Training Shorts - Black Performance',
    price: 38,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 134,
    category: 'Accessories',
    badge: 'Grip',
    discount: 20
  },
  {
    id: 11,
    name: 'Puma Backpack 20L - Blue/Yellow Sports Bag',
    price: 45,
    originalPrice: 59,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/93/f9/07/1742981790/cante-shpine-puma-20l-e-kalter--yll-200007523-0.webp',
    rating: 4.6,
    reviews: 167,
    category: 'Accessories',
    badge: 'Compact',
    discount: 24
  },
  {
    id: 12,
    name: 'Nike Chelsea FC Men\'s Hoodie - Blue/Yellow',
    price: 89,
    originalPrice: 115,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/fa/2c/f9/1727262849/duks-per-meshkuj-nike-chelsea-fc-i-kalter-yll-200004068-0.webp',
    rating: 4.8,
    reviews: 234,
    category: 'Football',
    badge: 'Official',
    discount: 23
  },
  {
    id: 13,
    name: 'Adidas Men\'s Hoodie - Blue/Yellow Classic',
    price: 75,
    originalPrice: 95,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/3b/89/92/1718094185/duks-per-meshkuj-adidas-e-kalter-yll-200002666-0.webp',
    rating: 4.7,
    reviews: 189,
    category: 'Training',
    badge: 'Comfort',
    discount: 21
  },
  {
    id: 14,
    name: 'Nike Sports Bag - Black Professional',
    price: 65,
    originalPrice: 85,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ff/f0/25/1753875529/cante-sportive-nike-e-zeze-yll-200009220-0.webp',
    rating: 4.5,
    reviews: 145,
    category: 'Accessories',
    badge: 'Professional',
    discount: 24
  },
  {
    id: 15,
    name: 'Adidas Kids Jacket - Black Athletic Wear',
    price: 55,
    originalPrice: 72,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 123,
    category: 'Kids',
    badge: 'Youth',
    discount: 24
  },
  {
    id: 16,
    name: 'Nike Men\'s Hoodie - Black Classic',
    price: 79,
    originalPrice: 99,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/19/75/50/1740487201/duks-nike-per-meshkuj-i-zi-yll-200007082-0.webp',
    rating: 4.7,
    reviews: 198,
    category: 'Training',
    badge: 'Classic',
    discount: 20
  },
  {
    id: 17,
    name: 'Nike Men\'s Training Pants - Blue Athletic',
    price: 69,
    originalPrice: 89,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/39/ee/f6/1759485218/trenerka-te-poshtme-nike-per-meshkuj-te-kaltra-yll-200009714-0.webp',
    rating: 4.5,
    reviews: 156,
    category: 'Training',
    badge: 'Performance',
    discount: 22
  },
  {
    id: 18,
    name: 'Adidas UltraBoost 23 Running Shoes',
    price: 189,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 345,
    category: 'Running',
    badge: 'UltraBoost',
    discount: 17
  },
  {
    id: 20,
    name: 'Professional Basketball - Spalding NBA',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'Basketball',
    badge: 'Official Size',
    discount: 20
  },
  {
    id: 23,
    name: 'Tennis Racket - Carbon Fiber Pro',
    price: 249,
    originalPrice: 319,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 145,
    category: 'Tennis',
    badge: 'Carbon Fiber',
    discount: 22
  },
  {
    id: 24,
    name: 'Gym Bag - Waterproof Sports Duffel',
    price: 69,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 198,
    category: 'Accessories',
    badge: 'Waterproof',
    discount: 22
  },
  {
    id: 25,
    name: 'Protein Shaker Bottle - 28oz',
    price: 19,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 234,
    category: 'Accessories',
    badge: 'BPA Free',
    discount: 24
  },
  {
    id: 26,
    name: 'Nike Air Force 1 Basketball Shoes',
    price: 119,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 567,
    category: 'Basketball',
    badge: 'Classic',
    discount: 20
  },
  {
    id: 27,
    name: 'Adidas UltraBoost Running Shoes',
    price: 179,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 678,
    category: 'Running',
    badge: 'Boost',
    discount: 19
  },
  {
    id: 28,
    name: 'Olympic Barbell - 45lb Steel',
    price: 299,
    originalPrice: 379,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
    category: 'Weightlifting',
    badge: 'Olympic',
    discount: 21
  },
  {
    id: 29,
    name: 'Wilson Pro Staff Tennis Racket',
    price: 189,
    originalPrice: 239,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'Tennis',
    badge: 'Pro Staff',
    discount: 21
  },
  {
    id: 30,
    name: 'Spalding NBA Basketball - Official Size',
    price: 39,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 345,
    category: 'Basketball',
    badge: 'Official',
    discount: 20
  },
  {
    id: 31,
    name: 'Nike Mercurial Soccer Cleats',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 456,
    category: 'Soccer',
    badge: 'Mercurial',
    discount: 20
  },
  {
    id: 32,
    name: 'Powerbeats Pro Wireless Earbuds',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 234,
    category: 'Accessories',
    badge: 'Wireless',
    discount: 20
  }
]

// Sports categories
const sportsCategories = [
  {
    name: 'Football',
    count: 156,
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
  },
  {
    name: 'Training',
    count: 234,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    name: 'Accessories',
    count: 189,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
  },
  {
    name: 'Drinkware',
    count: 87,
    color: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop'
  },
  {
    name: 'Basketball',
    count: 134,
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop'
  },
  {
    name: 'Running',
    count: 198,
    color: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop'
  },
  {
    name: 'Kids',
    count: 45,
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
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
  <div id="sports" />

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