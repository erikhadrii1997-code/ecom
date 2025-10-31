'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
}

interface HeroSliderProps {
  slides?: Slide[]
}

const defaultSlides = [
  {
    id: 1,
    title: 'Cutting-Edge Laptop',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop',
    buttonText: '',
    buttonLink: ''
  },
  {
    id: 2,
    title: 'Elegant Cosmetics',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=600&fit=crop',
    buttonText: '',
    buttonLink: ''
  },
  {
    id: 3,
    title: 'Sport Shoes Collection',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop',
    buttonText: '',
    buttonLink: ''
  },
  {
    id: 4,
    title: 'Modern Home Decor',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop',
    buttonText: '',
    buttonLink: ''
  },
  {
    id: 5,
    title: 'Fashion Trends',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=600&fit=crop',
    buttonText: '',
    buttonLink: ''
  },
  {
    id: 6,
    title: 'Luxury Bags',
    subtitle: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&h=600&fit=crop', // Girl with luxury bag
    buttonText: '',
    buttonLink: ''
  }
]

export default function HeroSlider({ slides = defaultSlides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1800); // 1.8 seconds
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

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
                  {/* Only the h1 title is shown, all other text removed */}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation dots and arrows removed as requested */}
      </div>
    </div>
  )
}
