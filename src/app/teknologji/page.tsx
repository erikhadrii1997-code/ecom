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

// Technology products from Foleja.com
const technologyProducts = [
  {
    id: 1,
    name: 'Laptop ThinkBook 14 G8 - Arctic Grey',
    price: 1299,
    originalPrice: 1499,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/85/5d/97/1755526480/laptop-thinkbook-14-g8-21sj0089pb-w11pro-ultra-7-255h16gb512gbint140-wuxgaarctic-grey3yrs-os--co2-offset-abp-200024729-0.webp',
    rating: 4.7,
    reviews: 145,
    category: 'Laptops',
    badge: 'Best Seller',
    discount: 13
  },
  {
    id: 2,
    name: 'Laptop ThinkPad E16 G3 - Professional Black',
    price: 1199,
    originalPrice: 1399,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/0c/f1/28/1755528403/laptop-thinkpad-e16-g3-21st0035pb-w11pro-7-25016gb512gbint160-wuxgablack1yr-premier--3yr-os--co2-offset-abp-200029060-0.webp',
    rating: 4.8,
    reviews: 89,
    category: 'Laptops',
    badge: 'Professional',
    discount: 14
  },
  {
    id: 3,
    name: 'Kruger & Matz Fun 10.08" Kids Tablet - Blue',
    price: 149,
    originalPrice: 199,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/7f/80/15/1755545491/childrens-tablet-kruger--matz-fun-1008-blue-abp-200022418-0.webp',
    rating: 4.3,
    reviews: 67,
    category: 'Tablets',
    badge: 'Kids Friendly',
    discount: 25
  },
  {
    id: 4,
    name: 'TCL Tab 10L Gen 2 - HD Space Black',
    price: 179,
    originalPrice: 229,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/cc/3d/05/1755891214/tcl-tablet-tab-10l-gen-2-332gb-hd-space-black-8492a-2alcwe11-rmu-200009495-0.webp',
    rating: 4.4,
    reviews: 92,
    category: 'Tablets',
    badge: 'Popular',
    discount: 22
  },
  {
    id: 5,
    name: 'Lenovo Tab M11 4G - MediaTek LTE 128GB',
    price: 299,
    originalPrice: 349,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/53/94/6b/1717427187/lenovo-tab-m11-4g-mediatek-lte-128-gb-279-cm-11-4-gb-wi-fi-5-80211ac-android-13-grey-acn-300107956-0.webp',
    rating: 4.6,
    reviews: 134,
    category: 'Tablets',
    badge: 'LTE Ready',
    discount: 14
  },
  {
    id: 6,
    name: 'Lenovo IdeaCentre AIO 24IRH9 - All-in-One PC',
    price: 899,
    originalPrice: 1099,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/f5/c3/76/1756127865/lenovo-ideacentre-aio-24irh9-i5-13420h-238-fhd-ips-ag-250nits-100hz-16gb-ddr5-5200-ssd1tb-intel-uhd-graphics-win11-cloud-grey-acn-300306465-0.webp',
    rating: 4.7,
    reviews: 78,
    category: 'All-in-One PCs',
    badge: 'Space Saver',
    discount: 18
  },
  {
    id: 7,
    name: 'Yealink MeetingBoard 75" Pro - Conference Display',
    price: 2999,
    originalPrice: 3499,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5a/b6/60/1756130758/yealink-meetingboard-75-pro-a02-kst-200046787-0.webp',
    rating: 4.9,
    reviews: 34,
    category: 'Conference Solutions',
    badge: 'Enterprise',
    discount: 14
  },
  {
    id: 8,
    name: 'Metz 43MQE7600Z - 43" QLED 4K Ultra HD TV',
    price: 599,
    originalPrice: 799,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ed/56/c4/1755771514/metz-43mqe7600z-43-qled-4k-ultra-hd-tv-inp-200006888-0.webp',
    rating: 4.5,
    reviews: 156,
    category: 'Smart TVs',
    badge: 'QLED',
    discount: 25
  }
]

// Technology categories
const technologyCategories = [
  {
    name: 'Laptops',
    icon: '💻',
    count: technologyProducts.filter(p => p.category === 'Laptops').length,
    color: 'from-blue-500 to-blue-600',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/85/5d/97/1755526480/laptop-thinkbook-14-g8-21sj0089pb-w11pro-ultra-7-255h16gb512gbint140-wuxgaarctic-grey3yrs-os--co2-offset-abp-200024729-0.webp'
  },
  {
    name: 'Tablets',
    icon: '📱',
    count: technologyProducts.filter(p => p.category === 'Tablets').length,
    color: 'from-green-500 to-green-600',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/53/94/6b/1717427187/lenovo-tab-m11-4g-mediatek-lte-128-gb-279-cm-11-4-gb-wi-fi-5-80211ac-android-13-grey-acn-300107956-0.webp'
  },
  {
    name: 'All-in-One PCs',
    icon: '🖥️',
    count: technologyProducts.filter(p => p.category === 'All-in-One PCs').length,
    color: 'from-purple-500 to-purple-600',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/f5/c3/76/1756127865/lenovo-ideacentre-aio-24irh9-i5-13420h-238-fhd-ips-ag-250nits-100hz-16gb-ddr5-5200-ssd1tb-intel-uhd-graphics-win11-cloud-grey-acn-300306465-0.webp'
  },
  {
    name: 'Smart TVs',
    icon: '📺',
    count: technologyProducts.filter(p => p.category === 'Smart TVs').length,
    color: 'from-red-500 to-red-600',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ed/56/c4/1755771514/metz-43mqe7600z-43-qled-4k-ultra-hd-tv-inp-200006888-0.webp'
  },
  {
    name: 'Conference Solutions',
    icon: '🎯',
    count: technologyProducts.filter(p => p.category === 'Conference Solutions').length,
    color: 'from-orange-500 to-orange-600',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5a/b6/60/1756130758/yealink-meetingboard-75-pro-a02-kst-200046787-0.webp'
  }
]

// Technology-specific slider using product images
const technologySlides = [
  {
    id: 1,
    title: 'Professional Laptops Collection',
    subtitle: 'Power meets portability',
    description: 'Discover premium ThinkBook and ThinkPad laptops for business professionals',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/85/5d/97/1755526480/laptop-thinkbook-14-g8-21sj0089pb-w11pro-ultra-7-255h16gb512gbint140-wuxgaarctic-grey3yrs-os--co2-offset-abp-200024729-0.webp',
    buttonText: 'Shop Laptops',
    buttonLink: '#laptops'
  },
  {
    id: 2,
    title: 'Smart Tablets for Everyone',
    subtitle: 'Entertainment and productivity combined',
    description: 'From kids tablets to professional devices - find your perfect tablet',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/53/94/6b/1717427187/lenovo-tab-m11-4g-mediatek-lte-128-gb-279-cm-11-4-gb-wi-fi-5-80211ac-android-13-grey-acn-300107956-0.webp',
    buttonText: 'Shop Tablets',
    buttonLink: '#tablets'
  },
  {
    id: 3,
    title: 'All-in-One Computing Solutions',
    subtitle: 'Space-saving desktop power',
    description: 'Lenovo IdeaCentre AIO - Perfect for home offices and modern workspaces',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/f5/c3/76/1756127865/lenovo-ideacentre-aio-24irh9-i5-13420h-238-fhd-ips-ag-250nits-100hz-16gb-ddr5-5200-ssd1tb-intel-uhd-graphics-win11-cloud-grey-acn-300306465-0.webp',
    buttonText: 'Shop All-in-One',
    buttonLink: '#aio'
  },
  {
    id: 4,
    title: 'Premium QLED Entertainment',
    subtitle: '4K Ultra HD viewing experience',
    description: 'Metz QLED TV - Immersive entertainment with stunning picture quality',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/ed/56/c4/1755771514/metz-43mqe7600z-43-qled-4k-ultra-hd-tv-inp-200006888-0.webp',
    buttonText: 'Shop Smart TVs',
    buttonLink: '#tvs'
  },
  {
    id: 5,
    title: 'Enterprise Conference Solutions',
    subtitle: 'Professional meeting technology',
    description: 'Yealink MeetingBoard Pro - Transform your conference rooms',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/5a/b6/60/1756130758/yealink-meetingboard-75-pro-a02-kst-200046787-0.webp',
    buttonText: 'Shop Conference',
    buttonLink: '#conference'
  }
]

// Technology testimonials
const technologyTestimonials = [
  {
    name: 'Mark Thompson',
    role: 'IT Manager',
    text: 'Excellent selection of professional technology products. The ThinkPad laptop exceeded our expectations for business use.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
  },
  {
    name: 'Sarah Chen',
    role: 'Software Developer',
    text: 'The Lenovo IdeaCentre is perfect for my home office setup. Great performance and space-saving design.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47e?w=60&h=60&fit=crop&crop=face'
  },
  {
    name: 'Alex Rodriguez',
    role: 'Digital Designer',
    text: 'Amazing quality products with competitive prices. The customer service is outstanding!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
  }
]

export default function TeknologjiPage() {
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
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
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
    if (quantity === 0) {
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
  }

  const filteredProducts = selectedCategory === 'All' 
    ? technologyProducts 
    : technologyProducts.filter(product => product.category === selectedCategory)

  const searchFilteredProducts = searchQuery
    ? filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-down"
          >
            {notification}
          </div>
        ))}
      </div>

      {/* Header */}
      <Header
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Slider */}
      <HeroSlider slides={technologySlides} />

      {/* Categories Section */}
      <CategoriesSection 
        categories={technologyCategories}
        onCategorySelect={filterProductsByCategory}
      />

      {/* Technology Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Technology Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover cutting-edge technology from top brands. From powerful laptops to smart displays.
            </p>
          </div>

          {/* Flash Deals Banner */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl mb-8 text-center">
            <h3 className="text-2xl font-bold mb-2">⚡ Technology Flash Deals!</h3>
            <p className="text-lg">Up to 25% off on selected tech products • Limited time only</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchFilteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onViewProduct={() => showProduct(product)}
              />
            ))}
          </div>

          {searchFilteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts 
        products={technologyProducts.slice(0, 4)}
        onAddToCart={addToCart}
        selectedCategory={selectedCategory}
        onCategoryChange={filterProductsByCategory}
        onViewProduct={showProduct}
      />

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
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