'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'Premium Technology Collection',
    subtitle: 'Discover the latest in tech innovation',
    description: 'Shop the most advanced electronics and gadgets from top brands',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    buttonText: 'Shop Now',
    buttonLink: '#products'
  },
  {
    id: 2,
    title: 'Beauty & Cosmetics',
    subtitle: 'Enhance your natural beauty',
    description: 'Discover premium cosmetics and beauty products for every skin type',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=600&fit=crop',
    buttonText: 'Shop Beauty',
    buttonLink: '#beauty'
  },
  {
    id: 3,
    title: 'Luxury Bags for Women',
    subtitle: 'Elegant handbags and accessories',
    description: 'Find the perfect bag to complement your style and lifestyle',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=600&fit=crop',
    buttonText: 'Shop Bags',
    buttonLink: '#bags'
  },
  {
    id: 4,
    title: 'Home & Lifestyle',
    subtitle: 'Transform your living space',
    description: 'Create the perfect home with our premium home and garden products',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    buttonText: 'Shop Home',
    buttonLink: '#home'
  },
  {
    id: 5,
    title: 'Fashion & Style',
    subtitle: 'Trendy styles for every occasion',
    description: 'Express your unique style with our curated fashion collection',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    buttonText: 'Shop Fashion',
    buttonLink: '#fashion'
  },
  {
    id: 6,
    title: 'Sports & Fitness',
    subtitle: 'Active lifestyle essentials',
    description: 'Gear up for your fitness journey with premium sports equipment',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    buttonText: 'Shop Sports',
    buttonLink: '#sports'
  },
  {
    id: 7,
    title: 'Books & Education',
    subtitle: 'Knowledge at your fingertips',
    description: 'Expand your mind with our extensive collection of books and educational materials',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
    buttonText: 'Shop Books',
    buttonLink: '#books'
  },
  {
    id: 8,
    title: 'Automotive',
    subtitle: 'Drive in style',
    description: 'Enhance your vehicle with premium automotive accessories and parts',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=600&fit=crop',
    buttonText: 'Shop Auto',
    buttonLink: '#automotive'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="pt-8">
      <div 
        className="relative h-64 md:h-80 overflow-hidden rounded-3xl mx-4 md:mx-8 shadow-2xl border-4 border-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat rounded-3xl"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-3xl"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-6 max-w-3xl">
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 animate-fade-in">
                    {slide.title}
                  </h1>
                  <h2 className="text-lg md:text-xl mb-3 text-gray-200">
                    {slide.subtitle}
                  </h2>
                  <p className="text-sm md:text-base mb-6 text-gray-300 max-w-xl mx-auto">
                    {slide.description}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? 'bg-white shadow-lg' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
