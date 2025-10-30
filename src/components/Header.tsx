'use client'

import { useState } from 'react'

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export default function Header({ cartCount, onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">E-Shop</span>
              <div className="text-xs text-gray-500 -mt-1">Digital Marketplace</div>
            </div>
            <div className="block sm:hidden">
              <span className="text-lg font-bold text-gray-900">E-Shop</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Products</a>
            <a href="/clothing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Clothing</a>
            <a href="/cosmetics" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Cosmetics</a>
            <a href="/sport" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Sport</a>
            <a href="/house" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">House</a>
            <a href="/teknologji" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Tech</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-2 sm:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-sm sm:text-base"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart and User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="relative p-1.5 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors" onClick={onCartClick}>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="p-1.5 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1.5 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="/clothing" className="text-gray-700 hover:text-blue-600 transition-colors">Clothing</a>
              <a href="/cosmetics" className="text-gray-700 hover:text-blue-600 transition-colors">Cosmetics</a>
              <a href="/sport" className="text-gray-700 hover:text-blue-600 transition-colors">Sport</a>
              <a href="/house" className="text-gray-700 hover:text-blue-600 transition-colors">House</a>
              <a href="/teknologji" className="text-gray-700 hover:text-blue-600 transition-colors">Tech</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
