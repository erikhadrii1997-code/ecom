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

// Cosmetics products from Foleja.com
const cosmeticsProducts = [
  {
    id: 1,
    name: 'Collistar Self Tanning Concentrate Body & Legs Magic Drops 125ml',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 134,
    category: 'Skincare',
    badge: 'Best Seller',
    discount: 24
  },
  {
    id: 2,
    name: 'Twilly d\'Hermès Eau de Perfume Spray 30ml',
    price: 85,
    originalPrice: 105,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 89,
    category: 'Perfumes',
    badge: 'Luxury',
    discount: 19
  },
  {
    id: 4,
    name: 'Hermès Paris Jour Absolue Eau de Parfum Rechargeable 50ml',
    price: 145,
    originalPrice: 169,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 156,
    category: 'Perfumes',
    badge: 'Exclusive',
    discount: 14
  },
  {
    id: 6,
    name: 'Boss Bottled Perfume Set - Spray 50ml + Deodorant 150ml',
    price: 65,
    originalPrice: 85,
    image: 'https://images.unsplash.com/photo-1622556498246-755f44ca76f3?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 167,
    category: 'Perfumes',
    badge: 'Value Set',
    discount: 24
  },
  {
    id: 7,
    name: 'Tommy Hilfiger Impact Together EDT 100ml',
    price: 55,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 98,
    category: 'Perfumes',
    badge: 'New',
    discount: 27
  },
  {
    id: 8,
    name: 'Tommy Hilfiger Tommy Eau de Toilette Spray 200ml',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 145,
    category: 'Perfumes',
    badge: 'Classic',
    discount: 24
  },
  {
    id: 9,
    name: 'Futurist Hydra Rescue Moisturizing Makeup SPF45 - 2N2 Buff 35ml',
    price: 52,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'Makeup',
    badge: 'SPF Protection',
    discount: 25
  },
  {
    id: 11,
    name: 'Clarins Everlasting Youth Fluid Foundation SPF15 - 114 Cappuccino 30ml',
    price: 55,
    originalPrice: 72,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 203,
    category: 'Makeup',
    badge: 'Anti-Aging',
    discount: 24
  },
  {
    id: 12,
    name: 'Clarins Everlasting Youth Fluid Foundation SPF15 - 109 Wheat 30ml',
    price: 55,
    originalPrice: 72,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 187,
    category: 'Makeup',
    badge: 'Natural Look',
    discount: 24
  },
  {
    id: 13,
    name: 'Alter Ego Scalpego Hair Shampoo 300ml',
    price: 28,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 134,
    category: 'Haircare',
    badge: 'Scalp Care',
    discount: 20
  },
  {
    id: 14,
    name: 'Inebrya Ice Cream Liss Pro Shampoo 300ml',
    price: 25,
    originalPrice: 32,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 98,
    category: 'Haircare',
    badge: 'Smoothing',
    discount: 22
  },
  {
    id: 15,
    name: 'Davidoff Cool Water Aftershave Lotion 125ml',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 145,
    category: 'Men\'s Grooming',
    badge: 'Fresh',
    discount: 22
  },
  {
    id: 17,
    name: 'Philips S3242/12 Men\'s Electric Shaver - Black/Gold',
    price: 85,
    originalPrice: 109,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
    category: 'Men\'s Grooming',
    badge: 'Electric',
    discount: 22
  },
  {
    id: 18,
    name: 'Beard Balm Nourishing Balm for Beard 56.7g',
    price: 18,
    originalPrice: 24,
    image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 167,
    category: 'Men\'s Grooming',
    badge: 'Nourishing',
    discount: 25
  },
  {
    id: 19,
    name: 'Anti-Aging Serum - Vitamin C Complex',
    price: 45,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 312,
    category: 'Skincare',
    badge: 'Vitamin C',
    discount: 24
  },
  {
    id: 20,
    name: 'Professional Makeup Brush Set - 24 Pieces',
    price: 89,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 245,
    category: 'Makeup',
    badge: 'Professional',
    discount: 25
  },
  {
    id: 21,
    name: 'Hydrating Face Mask Set - 10 Pack',
    price: 29,
    originalPrice: 39,
    image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 189,
    category: 'Skincare',
    badge: 'Hydrating',
    discount: 26
  },
  {
    id: 22,
    name: 'Premium Hair Oil - Argan & Jojoba',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 178,
    category: 'Hair Care',
    badge: 'Natural Oils',
    discount: 22
  },
  {
    id: 23,
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
    id: 24,
    name: 'Men\'s Cologne - Fresh Citrus Scent',
    price: 69,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 156,
    category: 'Fragrance',
    badge: 'Fresh Scent',
    discount: 22
  },
  {
    id: 25,
    name: 'Eye Cream - Anti-Wrinkle Formula',
    price: 55,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 198,
    category: 'Skincare',
    badge: 'Anti-Wrinkle',
    discount: 20
  },
  {
    id: 26,
    name: 'Hair Styling Kit - Professional Tools',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 145,
    category: 'Hair Care',
    badge: 'Professional',
    discount: 25
  },
  {
    id: 27,
    name: 'YSL Libre Eau de Parfum - 50ml',
    price: 149,
    originalPrice: 179,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    category: 'Fragrance',
    badge: 'Luxury',
    discount: 17
  },
  {
    id: 28,
    name: 'Dior Sauvage EDT - 100ml',
    price: 179,
    originalPrice: 219,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 345,
    category: 'Fragrance',
    badge: 'Bestseller',
    discount: 18
  },
  {
    id: 29,
    name: 'Charlotte Tilbury Magic Cream - 50ml',
    price: 129,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
    category: 'Skincare',
    badge: 'Magic',
    discount: 13
  },
  {
    id: 30,
    name: 'Fenty Beauty Foundation - Full Coverage',
    price: 39,
    originalPrice: 49,
    image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 267,
    category: 'Makeup',
    badge: 'Full Coverage',
    discount: 20
  },
  {
    id: 31,
    name: 'Rare Beauty Liquid Blush - Soft Pink',
    price: 25,
    originalPrice: 32,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 156,
    category: 'Makeup',
    badge: 'Trending',
    discount: 22
  },
  {
    id: 32,
    name: 'Glossier Cloud Paint Blush Set',
    price: 45,
    originalPrice: 54,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 198,
    category: 'Makeup',
    badge: 'Set',
    discount: 17
  },
  {
    id: 33,
    name: 'The Ordinary Niacinamide Serum - 30ml',
    price: 12,
    originalPrice: 15,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 456,
    category: 'Skincare',
    badge: 'Bestseller',
    discount: 20
  },
  {
    id: 34,
    name: 'Dyson Airwrap Complete Styler',
    price: 599,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 123,
    category: 'Hair Tools',
    badge: 'Revolutionary',
    discount: 14
  }
]

// Cosmetics categories
const cosmeticsCategories = [
  {
    name: 'Perfumes',
    count: 185,
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop'
  },
  {
    name: 'Makeup',
    count: 156,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
  },
  {
    name: 'Skincare',
    count: 123,
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
  },
  {
    name: 'Haircare',
    count: 98,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop'
  },
  {
    name: 'Luxury',
    count: 67,
    color: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    name: 'Sets',
    count: 89,
    color: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
  },
  {
    name: 'Men\'s Grooming',
    count: 95,
    color: 'bg-gray-500',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/c9/71/1e/1735226743/philips-s324212-mens-shaver-rotation-shaver-trimmer-black-gold-acn-300060460-0.webp'
  }
]

// Cosmetics hero slides
const cosmeticsSlides = [
  {
    id: 1,
    title: 'Premium Beauty Collection',
    subtitle: 'Discover luxury cosmetics from world-renowned brands',
    description: 'Transform your beauty routine with our curated selection of premium cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop',
    buttonText: 'Shop Beauty',
    buttonLink: '#products'
  },
  {
    id: 2,
    title: 'Signature Fragrances',
    subtitle: 'Find your perfect scent from luxury perfume houses',
    description: 'Explore exquisite fragrances from Hermès, Dolce & Gabbana, and more',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=600&fit=crop',
    buttonText: 'Explore Perfumes',
    buttonLink: '#categories'
  },
  {
    id: 3,
    title: 'Professional Makeup',
    subtitle: 'Achieve flawless looks with professional-grade cosmetics',
    description: 'Discover foundations, concealers, and beauty essentials for every skin tone',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&h=600&fit=crop',
    buttonText: 'Shop Makeup',
    buttonLink: '#featured'
  }
]

export default function CosmeticsPage() {
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
  const filteredProducts = cosmeticsProducts.filter(product => {
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
  <HeroSlider slides={cosmeticsSlides} />
  <div id="beauty" />

      {/* Categories Section */}
      <CategoriesSection
        categories={cosmeticsCategories}
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