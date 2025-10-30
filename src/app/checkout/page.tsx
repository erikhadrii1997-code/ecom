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

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerType: 'individual',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    acceptTerms: false
  })

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart items from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } else {
        setCartItems([]) // Empty cart if no items saved
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      setCartItems([]) // Fallback to empty cart
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to confirmation page
    window.location.href = '/checkout/confirm'
  }

  const shipping = 0.00
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Breadcrumb */}
          <div className="mb-10">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      1
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-blue-600">Adresa e transportit</span>
                      <p className="text-sm text-gray-500">Plotësoni të dhënat tuaja</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-blue-300 to-gray-300 rounded-full mx-4"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-lg font-bold">
                      2
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-medium text-gray-400">Mënyra e pagesës</span>
                      <p className="text-sm text-gray-400">Zgjidhni pagesën</p>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Enhanced Main Form */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Personal Data Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Të dhënat personale</h2>
                        <p className="text-gray-600">Plotësoni informacionet tuaja për të vazhduar me blerjen</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Customer Type */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="customerType"
                            value="individual"
                            checked={formData.customerType === 'individual'}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-blue-600 border-2 border-blue-300 focus:ring-blue-500 focus:ring-2"
                          />
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="text-lg font-semibold text-gray-800">Individ</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Emri*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Shkruani emrin tuaj"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mbiemri*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Shkruani mbiemrin tuaj"
                      />
                    </div>
                  </div>

                  <div className="mb-6 space-y-2">
                    <label className="block text-sm font-bold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      E-mail Adresa
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Adresa juaj</h3>
                    </div>
                  </div>

                  <div className="mb-6 space-y-2">
                    <label className="block text-sm font-bold text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Rruga dhe numri i vendbanimit*
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Rruga dhe numri i shtëpisë"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Numri i telefonit*
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="+383 XX XXX XXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Qyteti*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Prishtinë, Pejë, Gjakovë..."
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Shteti
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                      <option>🇽🇰 Kosovë</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-xl p-6">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          required
                          className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          Kam lexuar dhe pranoj 
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold mx-1 underline">kushtet e perdorimit</a>
                          & 
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold mx-1 underline">politikat e privatësisë</a>
                          (Lexo këtu) *
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.acceptTerms || cartItems.length === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {cartItems.length === 0 ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        Shporta është bosh
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Vazhdo në Pagesë
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Enhanced Order Summary Sidebar */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-4">
                {/* DHL Banner */}
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black p-6 rounded-2xl mb-8 text-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20"></div>
                  <div className="relative z-10">
                    <div className="text-2xl font-bold mb-2 flex items-center justify-center">
                      <span className="text-3xl mr-2">🚚</span>
                      DHL Express
                    </div>
                    <div className="text-sm font-medium opacity-90">Dorëzim i shpejtë dhe i sigurt</div>
                  </div>
                </div>

                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Shporta e blerjeve</h3>
                    <p className="text-gray-600">{cartItems.length} artikuj në shportë</p>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-8xl mb-6">🛒</div>
                      <p className="text-xl font-semibold text-gray-500 mb-2">Shporta e blerjeve është bosh</p>
                      <p className="text-gray-400 mb-6">Shtoni produkte për të vazhduar</p>
                      <button 
                        onClick={() => window.location.href = '/'}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                          </svg>
                          Vazhdo blerjen
                        </span>
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="flex items-start space-x-6">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-xl shadow-lg"
                            />
                            <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{item.name}</h4>
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                                Sasia: {item.quantity}
                              </div>
                              <div className="font-bold text-2xl text-blue-600">€{(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                            <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                              <span className="mr-2">✓</span>
                              <span className="text-sm font-medium">Në dispozicion</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Summary */}
                {cartItems.length > 0 && (
                  <div className="border-t-2 border-gray-200 pt-6">
                    <h4 className="font-bold text-xl mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Përmbledhje
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Nëntotali</span>
                        <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Transporti</span>
                        <div className="flex items-center">
                          <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">Falas</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-gray-900">Totali</span>
                          <span className="text-3xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">€{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}