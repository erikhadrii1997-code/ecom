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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ea/a2/d1/1754665196/collistar-self-tanning-concentrate-body-legs-magic-drops-125ml-bts-200006525-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/21/8a/98/1754665479/twilly-dhermes-eau-de-perfume-spray-30ml-bts-200003821-0.webp',
    rating: 4.9,
    reviews: 287,
    category: 'Perfumes',
    badge: 'Luxury',
    discount: 19
  },
  {
    id: 3,
    name: 'Q by Dolce & Gabbana Intense Eau de Parfum Spray 100ml',
    price: 125,
    originalPrice: 149,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/bb/dd/b0/1755100442/q-by-dolce--gabbana-intense-eau-de-parfum-spray-100ml-pvp-200034993-0.webp',
    rating: 4.8,
    reviews: 198,
    category: 'Perfumes',
    badge: 'Premium',
    discount: 16
  },
  {
    id: 4,
    name: 'Hermès Paris Jour Absolue Eau de Parfum Rechargeable 50ml',
    price: 145,
    originalPrice: 169,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/da/36/94/1754664342/hermes-hermes-paris-jour-absolue-eau-de-parfum-rellenable-50ml-spray-bts-200019608-0.webp',
    rating: 4.9,
    reviews: 156,
    category: 'Perfumes',
    badge: 'Exclusive',
    discount: 14
  },
  {
    id: 5,
    name: 'Carolina Herrera Good Girl Eau de Parfum 50ml',
    price: 95,
    originalPrice: 119,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/a7/09/d6/1754296357/eau-de-parfum-carolina-herrera-good-girl--50-ml-rev-200008681-0.webp',
    rating: 4.6,
    reviews: 234,
    category: 'Perfumes',
    badge: 'Popular',
    discount: 20
  },
  {
    id: 6,
    name: 'Boss Bottled Perfume Set - Spray 50ml + Deodorant 150ml',
    price: 65,
    originalPrice: 85,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5f/15/0f/1755100795/boss-bottled-perfume-set-spray-50ml--deodorant-spray-150ml-pvp-200029480-0.webp',
    rating: 4.5,
    reviews: 167,
    category: 'Perfumes',
    badge: 'Gift Set',
    discount: 24
  },
  {
    id: 7,
    name: 'Tommy Hilfiger Impact Together EDT 100ml',
    price: 55,
    originalPrice: 75,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/f7/93/a2/1754665908/tommy-hilfiger-tommy-hil-impact-together-etv-100ml-bts-200029959-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/48/ce/db/1754676407/tommy-hilfiger-tommy-eau-de-toilette-spray-200ml-bts-200001930-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/9b/ef/cb/1755100420/futurist-hydra-rescue-moisturizing-makeup-spf45-long-lasting-covering-illuminating-face-foundation-2n2-buff-35ml-pvp-200021136-0.webp',
    rating: 4.7,
    reviews: 189,
    category: 'Makeup',
    badge: 'SPF Protection',
    discount: 25
  },
  {
    id: 10,
    name: 'Even Better Makeup SPF15 Foundation - CN 075 Custard 30ml',
    price: 48,
    originalPrice: 62,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/c5/5b/f4/1754664689/even-better-makeup-spf15-foundation-even-skin-tone-cn-075-custard-30ml-pvp-200018136-0.webp',
    rating: 4.6,
    reviews: 156,
    category: 'Makeup',
    badge: 'Even Tone',
    discount: 23
  },
  {
    id: 11,
    name: 'Clarins Everlasting Youth Fluid Foundation SPF15 - 114 Cappuccino 30ml',
    price: 55,
    originalPrice: 72,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/c6/19/3d/1755612778/clarins-everlasting-youth-fluid-foundation-spf15-114-cappuccino-30ml-bts-200035812-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/94/aa/73/1755612789/clarins-everlasting-youth-fluid-foundation-spf15-109-wheat-30ml-bts-200035806-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/28/dc/94/1754297591/shampo-per-floke-alter-ego-scalpego-300-ml-rev-200007792-0.webp',
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
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/2f/a3/1c/1754393178/shampo-per-floke-inebrya-ice-cream-liss-pro-300-ml-rev-200002944-0.webp',
    rating: 4.4,
    reviews: 98,
    category: 'Haircare',
    badge: 'Smoothing',
    discount: 22
  }
]

// Cosmetics categories
const cosmeticsCategories = [
  {
    name: 'Perfumes',
    icon: '🌸',
    count: 185,
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop'
  },
  {
    name: 'Makeup',
    icon: '💄',
    count: 156,
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
  },
  {
    name: 'Skincare',
    icon: '✨',
    count: 123,
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
  },
  {
    name: 'Haircare',
    icon: '💇',
    count: 98,
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop'
  },
  {
    name: 'Luxury',
    icon: '💎',
    count: 67,
    color: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    name: 'Sets',
    icon: '🎁',
    count: 89,
    color: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
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