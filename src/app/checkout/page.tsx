'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface CheckoutFormData {
  customerType: 'individual'
  firstName: string
  lastName: string
  email: string
  address: string
  phone: string
  city: string
  acceptTerms: boolean
}

const products = [
  {
    name: 'Living Room Set Best - Walnut',
    image: 'https://images.unsplash.com/photo-1505692952047-1a78307cf61b?w=400&h=400&fit=crop',
    price: 1250,
    originalPrice: 1450,
  },
    // ...existing code...
  {
    name: 'Yoga Mat Premium - 6mm Thickness',
    image: 'https://images.unsplash.com/photo-1506629905607-94b8bb9a7a59?w=400&h=400&fit=crop',
    price: 55,
    originalPrice: 69,
    category: 'Fitness',
    badge: 'Eco-Friendly',
    discount: 20,
    rating: 4.5
  },
  {
    name: 'Swimming Goggles - Competition Grade',
    image: 'https://images.unsplash.com/photo-1534367610174-d4aa2de1bb5d?w=400&h=400&fit=crop',
    price: 29,
    originalPrice: 39,
    category: 'Swimming',
    badge: 'Anti-Fog',
    discount: 26,
    rating: 4.4
  },
  {
    name: 'Q by Dolce & Gabbana Intense Eau de Parfum Spray 100ml',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=400&h=400&fit=crop',
    price: 125,
    originalPrice: 149,
    category: 'Perfumes',
    badge: 'Premium',
    discount: 16,
    rating: 4.8
  },
  {
    name: 'Carolina Herrera Good Girl Eau de Parfum 50ml',
    image: 'https://images.unsplash.com/photo-1594736797933-d0b22d0f7b9c?w=400&h=400&fit=crop',
    price: 95,
    originalPrice: 119,
    category: 'Perfumes',
    badge: 'Popular',
    discount: 20,
    rating: 4.6
  },
  {
    name: 'Even Better Makeup SPF15 Foundation - CN 075 Custard 30ml',
    image: 'https://images.unsplash.com/photo-1631214540675-c2281c9b4daa?w=400&h=400&fit=crop',
    price: 48,
    originalPrice: 62,
    category: 'Makeup',
    badge: 'Even Tone',
    discount: 23,
    rating: 4.6
  },
  {
    name: 'Cuba Aftershave & Deodorant Set - 100ml + 200ml',
    image: 'https://images.unsplash.com/photo-1564594985645-4427056bf22e?w=400&h=400&fit=crop',
    price: 25,
    originalPrice: 35,
    category: "Men's Grooming",
    badge: 'Value Set',
    discount: 29,
    rating: 4.3
  },
  {
    name: 'Winter Hoodie - Fleece Lined',
    image: 'https://images.unsplash.com/photo-1556821840-3a9b520d20af?w=400&h=400&fit=crop',
    price: 79,
    originalPrice: 99,
    category: 'Hoodies',
    badge: 'Warm',
    discount: 20,
    rating: 4.7
  },
  {
    name: "Adidas Originals Hoodie",
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop',
    price: 65,
    originalPrice: 85,
    category: 'Hoodies',
    badge: 'Adidas',
    discount: 24,
    rating: 4.6
  },
  {
    name: "Levi's 501 Original Jeans",
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    price: 89,
    originalPrice: 109,
    category: 'Fashion',
    badge: 'Classic',
    discount: 18,
    rating: 4.5,
    reviews: 234
  }
]

// ...existing code...

export default function CheckoutPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Filter products by search query
  const searchFilteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : products;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="mt-2 text-blue-600 underline text-sm"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Search results for &quot;{searchQuery}&quot;</h2>
          {searchFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {searchFilteredProducts.map((product, idx) => (
                <div key={idx} className="bg-white border rounded-lg p-4 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2 rounded" />
                  <div className="font-bold text-gray-900 mb-1">{product.name}</div>
                  <div className="text-gray-600 mb-1">${product.price} <span className="line-through text-sm text-gray-400 ml-2">${product.originalPrice}</span></div>
                  {product.category && <div className="text-xs text-blue-500 mb-1">{product.category}</div>}
                  {product.badge && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold mb-1">{product.badge}</span>}
                  {product.discount && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold mb-1">{product.discount}% off</span>}
                  {product.rating && <span className="text-yellow-500 text-xs">★ {product.rating}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-lg font-semibold mb-2">No products found</div>
              <div className="text-gray-600">Try adjusting your search terms or browse our categories</div>
            </div>
          )}
        </div>
      )}

      {/* Testimonial Section */}
      <div className="testimonial-section bg-gray-50 p-4 rounded-lg mt-8 flex flex-col md:flex-row items-center gap-4">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Sarah Johnson Verified Purchase"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-blue-700">Verified Purchase</div>
          <blockquote className="italic text-gray-700">“Amazing selection and lightning-fast delivery! The quality is outstanding and the customer service is top-notch.”</blockquote>
          <div className="mt-2 font-bold text-gray-900">Sarah Johnson</div>
          <div className="text-sm text-gray-500">Tech Enthusiast</div>
        </div>
      </div>

      {/* ...existing checkout page content... */}
    </div>
  );
}