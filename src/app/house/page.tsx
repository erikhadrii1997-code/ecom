'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

// Type definitions for house products
interface HouseProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  description: string
  brand: string
  inStock: boolean
}

interface CartItem extends HouseProduct {
  quantity: number
}

const houseProducts: HouseProduct[] = [
  {
    id: 1,
    name: 'Modern House Design 3-Bedroom',
    price: 2500,
    originalPrice: 2800,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=1920,width=1920/media/4b/38/66/1755003386/Shtepi3.png',
    rating: 4.9,
    reviews: 45,
    category: 'House Design',
    description: 'Beautiful modern 3-bedroom house design with contemporary architecture.',
    brand: 'Modern Homes',
    inStock: true
  },
  {
    id: 2,
    name: 'Contemporary Garden House',
    price: 3200,
    originalPrice: 3600,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=1920,width=1920/media/52/b3/8b/1755003410/Kopsht4.png',
    rating: 4.8,
    reviews: 38,
    category: 'House Design',
    description: 'Elegant contemporary house with beautiful garden integration.',
    brand: 'Garden Homes',
    inStock: true
  },
  {
    id: 3,
    name: 'Komoda Sirtar 11-Drawer Cabinet',
    price: 450,
    originalPrice: 520,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=1920,width=1920/media/c3/13/db/1755248064/KomodaSirtar11.png',
    rating: 4.7,
    reviews: 82,
    category: 'Storage Furniture',
    description: 'Spacious 11-drawer cabinet perfect for bedroom or living room storage.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 4,
    name: 'Extendable Dining Table & Chairs Set',
    price: 699,
    originalPrice: 799,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/47/c9/ea/1754748799/extendable-dining-table--chairs-set-4-pieces-hanah-home-vina-1053---anthracite-white-asg-200008357-0.webp',
    rating: 4.6,
    reviews: 156,
    category: 'Dining Furniture',
    description: '4-piece extendable dining set in anthracite and white finish.',
    brand: 'Hanah Home Vina',
    inStock: true
  },
  {
    id: 5,
    name: 'Nightstand Hanah Home Kale - White',
    price: 89,
    originalPrice: 109,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5c/56/9f/1754489483/nightstand-hanah-home-kale---4922-asg-200006175-0.webp',
    rating: 4.5,
    reviews: 94,
    category: 'Bedroom Furniture',
    description: 'Elegant white nightstand with modern design and storage space.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 6,
    name: 'Nightstand Hanah Home Elina',
    price: 95,
    originalPrice: 119,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/c4/28/7a/1754514355/nightstand-hanah-home-elina---8170-asg-200006166-0.webp',
    rating: 4.6,
    reviews: 73,
    category: 'Bedroom Furniture',
    description: 'Stylish Elina nightstand with premium finish and functional design.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 7,
    name: 'Multi-Purpose Cabinet Grano 140 - Caucasian Oak',
    price: 320,
    originalPrice: 380,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/7b/a8/9e/1754567102/multi-purpose-cabinet-hanah-home-grano-140---caucasian-oak-asg-200004022-0.webp',
    rating: 4.8,
    reviews: 67,
    category: 'Storage Furniture',
    description: 'Versatile cabinet in beautiful Caucasian Oak finish for any room.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 8,
    name: 'Multi-Purpose Cabinet Grano 140 - Anthracite',
    price: 320,
    originalPrice: 380,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/e7/77/94/1754561908/multi-purpose-cabinet-hanah-home-grano-140---anthracite-asg-200004021-0.webp',
    rating: 4.8,
    reviews: 71,
    category: 'Storage Furniture',
    description: 'Modern cabinet in sleek anthracite finish with ample storage space.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 9,
    name: 'Living Room Furniture Set Best - Walnut',
    price: 1250,
    originalPrice: 1450,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/7b/bd/cc/1754466162/living-room-furniture-set-hanah-home-best---walnut-asg-200005422-0.webp',
    rating: 4.9,
    reviews: 123,
    category: 'Living Room',
    description: 'Complete living room set in elegant walnut finish with modern styling.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 10,
    name: 'Living Room Furniture Set Luxe - White Gold',
    price: 1380,
    originalPrice: 1580,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/6a/e5/22/1754764225/living-room-furniture-set-hanah-home-luxe-set---white-gold-asg-200002900-0.webp',
    rating: 4.9,
    reviews: 98,
    category: 'Living Room',
    description: 'Luxurious living room set with white and gold accents for premium styling.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 11,
    name: 'Living Room Furniture Set Luxe - Walnut Gold',
    price: 1380,
    originalPrice: 1580,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/76/5b/12/1754469562/living-room-furniture-set-hanah-home-luxe-set---walnut-gold-asg-200002898-0.webp',
    rating: 4.8,
    reviews: 87,
    category: 'Living Room',
    description: 'Premium walnut and gold living room set with sophisticated design.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 12,
    name: 'Living Room Furniture Set Valentina - White Sapphire',
    price: 1150,
    originalPrice: 1350,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/20/1e/b6/1754494343/living-room-furniture-set-hanah-home-valentina---white-sapphire-asg-200005698-0.webp',
    rating: 4.7,
    reviews: 112,
    category: 'Living Room',
    description: 'Elegant Valentina set in white sapphire finish with contemporary appeal.',
    brand: 'Hanah Home',
    inStock: true
  },
  {
    id: 13,
    name: 'Living Room Furniture Set Istanbul - Walnut Anthracite',
    price: 1200,
    originalPrice: 1400,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/9d/fa/6c/1754659627/living-room-furniture-set-hanah-home-istanbul---walnut-anthracite-asg-200005487-0.webp',
    rating: 4.8,
    reviews: 95,
    category: 'Living Room',
    description: 'Istanbul collection in walnut anthracite with modern European styling.',
    brand: 'Hanah Home',
    inStock: true
  }
]

export default function HousePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [notifications, setNotifications] = useState<string[]>([])

  const addToCart = (product: HouseProduct) => {
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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const categories = ['All', 'House Design', 'Living Room', 'Bedroom Furniture', 'Dining Furniture', 'Storage Furniture']

  const filteredProducts = houseProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">🏠 House Products</h1>
          <p className="text-xl md:text-2xl mb-8">Transform Your Home with Premium Furniture & Design</p>
          <div className="flex justify-center space-x-4 text-sm md:text-base">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free Delivery
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Premium Quality
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Expert Support
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All House Products' : selectedCategory}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm">
                  ⭐ {product.rating}
                </div>
              </div>
              
              <div className="p-4">
                <div className="text-sm text-blue-600 font-medium mb-1">{product.brand}</div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <button 
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300"
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

      <Footer />
    </div>
  )
}