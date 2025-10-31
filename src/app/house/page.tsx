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

const houseProducts = [
  {
    id: 1,
    name: 'Modern House Design 3-Bedroom',
    price: 2500,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'House Design',
    badge: 'Best Seller',
    discount: 17
  },
  {
    id: 2,
    name: 'Contemporary Garden House',
    price: 3200,
    originalPrice: 3599,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 89,
    category: 'House Design',
    badge: 'Premium',
    discount: 11
  },
  {
    id: 3,
    name: 'Komoda Sirtar 11-Drawer Cabinet',
    price: 450,
    originalPrice: 520,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'Storage',
    badge: 'Premium',
    discount: 13
  },
  {
    id: 4,
    name: 'Extendable Dining Table & Chairs Set',
    price: 699,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 156,
    category: 'Dining',
    badge: 'Trending',
    discount: 12
  },
  {
    id: 5,
    name: 'Nightstand Hanah Home Kale',
    price: 89,
    originalPrice: 109,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 78,
    category: 'Bedroom',
    badge: 'Sale',
    discount: 18
  },
  {
    id: 6,
    name: 'Nightstand Hanah Home Elina',
    price: 95,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 92,
    category: 'Bedroom',
    badge: 'Popular',
    discount: 20
  },
  {
    id: 7,
    name: 'Multi-Purpose Cabinet Grano - Oak',
    price: 320,
    originalPrice: 380,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 67,
    category: 'Storage',
    badge: 'Innovation',
    discount: 16
  },
  {
    id: 9,
    name: 'Premium Home Fragrance Collection',
    price: 85,
    originalPrice: 105,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 145,
    category: 'Decor',
    badge: 'Luxury',
    discount: 19
  },
  {
    id: 11,
    name: 'Modern Kitchen Essentials',
    price: 55,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 123,
    category: 'Kitchen',
    badge: 'Essential',
    discount: 27
  },
  {
    id: 12,
    name: 'Bathroom Luxury Set',
    price: 95,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 167,
    category: 'Bathroom',
    badge: 'Premium',
    discount: 20
  },
  {
    id: 13,
    name: '1-Seat Sofa Atelier Del Sofa Hamlet - Beige',
    price: 599,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 145,
    category: 'Living Room',
    badge: 'Designer',
    discount: 14
  },
  {
    id: 14,
    name: '2-Seat Sofa Atelier Del Sofa Petra 2 - Blue',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 189,
    category: 'Living Room',
    badge: 'Premium',
    discount: 18
  },
  {
    id: 15,
    name: 'Corner Sofa Atelier Del Sofa Pars Cream - Corner V2',
    price: 1299,
    originalPrice: 1599,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/77/08/6c/1754494669/corner-sofa-atelier-del-sofa-pars-cream-1l--1r---corner-v2-asg-200031077-0.webp',
    rating: 4.7,
    reviews: 134,
    category: 'Living Room',
    badge: 'Best Seller',
    discount: 19
  },
  {
    id: 16,
    name: 'Corner Sofa Atelier Del Sofa Sora with Pouffe - Brown',
    price: 1499,
    originalPrice: 1799,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5e/df/44/1754471260/corner-sofa-atelier-del-sofa-sora-l1-o1-o1-1r-pouffe----brown-asg-200031133-0.webp',
    rating: 4.8,
    reviews: 167,
    category: 'Living Room',
    badge: 'Luxury',
    discount: 17
  },
  {
    id: 17,
    name: 'Corner Sofa Atelier Del Sofa Lily Corner Left - Green',
    price: 1199,
    originalPrice: 1399,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ab/22/b5/1754496359/corner-sofa-atelier-del-sofa-lily-corner-left-green-asg-200031199-0.webp',
    rating: 4.6,
    reviews: 123,
    category: 'Living Room',
    badge: 'Modern',
    discount: 14
  },
  {
    id: 18,
    name: '3-Seat Sofa Atelier Del Sofa Napoli - Cappuccino',
    price: 1099,
    originalPrice: 1299,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/e9/71/ba/1754517659/3-seat-sofa-atelier-del-sofa-napoli---cappuccino-asg-200033010-0.webp',
    rating: 4.7,
    reviews: 156,
    category: 'Living Room',
    badge: 'Comfort',
    discount: 15
  },
  {
    id: 19,
    name: 'Dining Table Set Oak Wood - 6 Chairs',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    category: 'Dining Room',
    badge: 'Oak Wood',
    discount: 25
  },
  {
    id: 20,
    name: 'Modern Bedroom Set - King Size',
    price: 1599,
    originalPrice: 1899,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    category: 'Bedroom',
    badge: 'Complete Set',
    discount: 16
  },
  {
    id: 21,
    name: 'Kitchen Cabinet Set - White Modern',
    price: 2299,
    originalPrice: 2799,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 145,
    category: 'Kitchen',
    badge: 'Modern Design',
    discount: 18
  },
  {
    id: 22,
    name: 'Office Desk Executive - Walnut Finish',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 167,
    category: 'Office',
    badge: 'Executive',
    discount: 20
  },
  {
    id: 24,
    name: 'Garden Patio Set - Teak Wood',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 134,
    category: 'Garden',
    badge: 'Weather Resistant',
    discount: 19
  },
  {
    id: 25,
    name: 'Luxury Mattress - Memory Foam Queen',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 278,
    category: 'Bedroom',
    badge: 'Memory Foam',
    discount: 25
  },
  {
    id: 26,
    name: 'TV Stand Entertainment Center - 65"',
    price: 549,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 156,
    category: 'Living Room',
    badge: 'Large Screen',
    discount: 21
  },
  {
    id: 27,
    name: '4-Seat Sofa Atelier Del Sofa Monaco - Grey',
    price: 1499,
    originalPrice: 1799,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/9d/66/3f/1754762664/2-seat-sofa-atelier-del-sofa-petra-2---blue-asg-200030779-0.webp',
    rating: 4.8,
    reviews: 189,
    category: 'Living Room',
    badge: 'Luxury',
    discount: 17
  },
  {
    id: 28,
    name: 'Recliner Sofa Atelier Del Sofa Comfort - Brown',
    price: 899,
    originalPrice: 1099,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/4c/87/5c/1754506855/1-seat-sofa-atelier-del-sofa-hamlet---beige-asg-200030698-0.webp',
    rating: 4.7,
    reviews: 167,
    category: 'Living Room',
    badge: 'Comfort',
    discount: 18
  },
  {
    id: 29,
    name: 'L-Shape Corner Sofa Atelier Del Sofa Milan',
    price: 1799,
    originalPrice: 2199,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/ab/22/b5/1754496359/corner-sofa-atelier-del-sofa-lily-corner-left-green-asg-200031199-0.webp',
    rating: 4.9,
    reviews: 134,
    category: 'Living Room',
    badge: 'L-Shape',
    discount: 18
  },
  {
    id: 30,
    name: 'Chesterfield Sofa Atelier Del Sofa Classic',
    price: 1299,
    originalPrice: 1599,
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/e9/71/ba/1754517659/3-seat-sofa-atelier-del-sofa-napoli---cappuccino-asg-200033010-0.webp',
    rating: 4.6,
    reviews: 178,
    category: 'Living Room',
    badge: 'Classic',
    discount: 19
  },
  {
    id: 31,
    name: 'Modern Dining Set - 8 Chairs Oak Wood',
    price: 1199,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 145,
    category: 'Dining Room',
    badge: 'Large',
    discount: 20
  },
  {
    id: 32,
    name: 'King Size Bed Frame - Upholstered',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 234,
    category: 'Bedroom',
    badge: 'Upholstered',
    discount: 20
  },
  {
    id: 33,
    name: 'Walk-in Closet System - Modern',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 98,
    category: 'Storage',
    badge: 'System',
    discount: 17
  }
]

// House-specific slider using product images
const houseSlides = [
  {
    id: 1,
    title: 'Modern House Designs',
    subtitle: 'Contemporary living spaces',
    description: 'Discover stunning 3-bedroom modern house designs with premium finishes',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/4b/38/66/1755003386/Shtepi3.png',
    buttonText: 'View Houses',
    buttonLink: '#houses'
  },
  {
    id: 2,
    title: 'Garden Houses Collection',
    subtitle: 'Outdoor living redefined',
    description: 'Contemporary garden houses perfect for relaxation and entertainment',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/52/b3/8b/1755003410/Kopsht4.png',
    buttonText: 'Shop Garden',
    buttonLink: '#garden'
  },
  {
    id: 3,
    title: 'Premium Storage Solutions',
    subtitle: 'Organize in style',
    description: 'Komoda storage cabinets and multi-purpose furniture for every room',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/c3/13/db/1755248064/KomodaSirtar11.png',
    buttonText: 'Shop Storage',
    buttonLink: '#storage'
  },
  {
    id: 4,
    title: 'Living Room Elegance',
    subtitle: 'Comfort meets luxury',
    description: 'Premium living room furniture sets in beautiful walnut finishes',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/7b/bd/cc/1754466162/living-room-furniture-set-hanah-home-best---walnut-asg-200005422-0.webp',
    buttonText: 'Shop Living Room',
    buttonLink: '#living'
  },
  {
    id: 5,
    title: 'Dining Room Essentials',
    subtitle: 'Gather in style',
    description: 'Extendable dining tables and chair sets perfect for family gatherings',
    image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=600,width=1200/media/47/c9/ea/1754748799/extendable-dining-table--chairs-set-4-pieces-hanah-home-vina-1053---anthracite-white-asg-200008357-0.webp',
    buttonText: 'Shop Dining',
    buttonLink: '#dining'
  }
]

const categories = [
  { name: 'House Design', image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=1920,width=1920/media/4b/38/66/1755003386/Shtepi3.png', count: 247, color: 'bg-blue-500' },
  { name: 'Living Room', image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/4c/87/5c/1754506855/1-seat-sofa-atelier-del-sofa-hamlet---beige-asg-200030698-0.webp', count: 195, color: 'bg-pink-500' },
  { name: 'Bedroom', image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/5c/56/9f/1754489483/nightstand-hanah-home-kale---4922-asg-200006175-0.webp', count: 156, color: 'bg-green-500' },
  { name: 'Dining', image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/47/c9/ea/1754748799/extendable-dining-table--chairs-set-4-pieces-hanah-home-vina-1053---anthracite-white-asg-200008357-0.webp', count: 98, color: 'bg-orange-500' },
  { name: 'Storage', image: 'https://www.foleja.com/cdn-cgi/image/fit=scale-down,format=auto,height=400,width=400/media/7b/a8/9e/1754567102/multi-purpose-cabinet-hanah-home-grano-140---caucasian-oak-asg-200004022-0.webp', count: 134, color: 'bg-purple-500' },
  { name: 'Kitchen', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop', count: 87, color: 'bg-yellow-500' }
]

const testimonials = [
  {
    name: 'Maria Gonzalez',
    role: 'Home Designer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Incredible furniture quality! The house designs are stunning and the furniture pieces are exactly what I needed for my projects.'
  },
  {
    name: 'John Smith',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Amazing selection of house products. The living room set transformed our entire home. Excellent quality and fast delivery!'
  },
  {
    name: 'Emma Wilson',
    role: 'Interior Decorator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'The house designs and furniture collection is exceptional! Perfect for modern homes. My clients absolutely love them!'
  }
]

export default function HousePage() {
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

  const filteredProducts = houseProducts.filter(product => {
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
  <HeroSlider slides={houseSlides} />
  <div id="home" />

      {/* eBay-style Trust Indicators */}
      <div className="bg-gray-50 py-4 sm:py-6 border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Quality Guarantee</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-medium">Free Assembly</span>
            </div>
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Home Delivery</span>
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

      {/* Flash Deals Section - House Style */}
      <section className="py-8 sm:py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">🏠 House Flash Deals</h2>
              <p className="text-sm sm:text-base text-gray-600">Limited time offers on house products!</p>
            </div>
            <div className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">Ends in 6h 30m</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houseProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="bg-blue-50 rounded-lg border-2 border-red-200 p-4 hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}%
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-red-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    )}
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

      {/* Best Sellers Section - House Style */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">🏆 Best House Products</h2>
              <p className="text-gray-600">Top-rated house products our customers love</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houseProducts.slice(4, 8).map((product, index) => (
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

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onAddToCart={addToCart}
      />
    </div>
  )
}