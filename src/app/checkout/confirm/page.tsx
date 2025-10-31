'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface PaymentMethod {
  id: string
  name: string
  description: string
}

interface ShippingMethod {
  id: string
  name: string
  price: number
  description: string
}

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CheckoutConfirmPage() {
  const [selectedPayment, setSelectedPayment] = useState('cash')
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [orderNotes, setOrderNotes] = useState('')
  const [sameAsBilling, setSameAsBilling] = useState(true)
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

  const paymentMethods: PaymentMethod[] = [
    { id: 'cash', name: 'Para në dorë në pranim', description: 'Paguani kur të marrni produktin' },
    { id: 'card', name: 'Kartelë/POS në pranim', description: 'Paguani me kartë kur të marrni produktin' },
    { id: 'online', name: 'Online direkt', description: 'Paguani tani me kartë online' }
  ]

  const shippingMethods: ShippingMethod[] = [
    { id: 'standard', name: 'Standard (Falas)', price: 0, description: 'Dorëzim 3-5 ditë pune' }
  ]

  // Sample cart items and customer data
  const billingAddress = {
    name: 'erik hadri',
    address: 'Hajdar Dushi',
    phone: '044106964'
  }

  const shipping = 0.00
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Shporta e blerjeve është bosh!')
      return
    }
    // Clear cart after successful order
    localStorage.removeItem('cart')
    alert('Porosia është dërguar! Faleminderit për blerjen.')
    // Redirect to home page
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-100">
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Breadcrumb */}
          <div className="mb-10">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      ✓
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-medium text-green-600">Adresa e transportit</span>
                      <p className="text-sm text-gray-500">Kompletuar</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-4"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      2
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-blue-600">Mënyra e pagesës</span>
                      <p className="text-sm text-gray-500">Finalizoni blerjen</p>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Enhanced Main Content */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {/* Payment Methods */}
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Zgjedhni mënyrën e pagesës</h2>
                      <p className="text-gray-600">Zgjidh një nga opsionet e pagesës për të kompletuar blerjen</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <label key={method.id} className={`flex items-start p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPayment === method.id 
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="w-5 h-5 text-blue-600 border-2 border-blue-300 focus:ring-blue-500 focus:ring-2 mt-1 mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {method.id === 'cash' && <span className="text-2xl mr-3">💵</span>}
                            {method.id === 'card' && <span className="text-2xl mr-3">💳</span>}
                            {method.id === 'online' && <span className="text-2xl mr-3">🌐</span>}
                            <div className="font-bold text-lg text-gray-900">{method.name}</div>
                          </div>
                          <div className="text-gray-600">{method.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shipping Methods */}
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">Mënyra e transportit</h2>
                      <p className="text-gray-600">Zgjidhni shërbimin e dorëzimit</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {shippingMethods.map((method) => (
                      <label key={method.id} className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedShipping === method.id 
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}>
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={selectedShipping === method.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="w-5 h-5 text-purple-600 border-2 border-purple-300 focus:ring-purple-500 focus:ring-2 mt-1 mr-4"
                          />
                          <div>
                            <div className="flex items-center mb-2">
                              <span className="text-2xl mr-3">🚚</span>
                              <div className="font-bold text-lg text-gray-900">{method.name}</div>
                            </div>
                            <div className="text-gray-600">{method.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                            {method.price === 0 ? 'Falas' : `€${method.price.toFixed(2)}`}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* DHL Banner */}
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black p-8 rounded-2xl mb-10 text-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold mb-3 flex items-center justify-center">
                      <span className="text-4xl mr-3">🚚</span>
                      DHL Express
                    </div>
                    <div className="text-lg font-medium opacity-90">Shpërndarje e shpejtë dhe e sigurt</div>
                    <div className="text-sm mt-2 opacity-75">Dorëzim brenda 24-48 orëve</div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Informatë shtesë</h3>
                      <p className="text-gray-600">Komente opsionale për porosinë</p>
                    </div>
                  </div>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Dëshironi të na tregoni diçka për porosinë tuaj?"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="mb-10">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-amber-600 mt-1 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.056 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h4 className="font-bold text-lg text-amber-800 mb-3">Kushtet dhe Rregullat</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Duke klikuar butonin &quot;Finalizo blerjen&quot;, ju konfirmoni se keni lexuar, kuptuar dhe pranuar 
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold mx-1 underline">politikën e privatësisë</a>
                          dhe 
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold mx-1 underline">kushtet tona të përdorimit</a>. 
                          Vetëm pas konfirmimit të sasisë së produktit si dhe informatat tjera, do të procesojmë porosinë tuaj!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-xl font-bold text-blue-800">Adresa e faturimit</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-800">{billingAddress.name}</div>
                      <div className="text-gray-600">{billingAddress.address}</div>
                      <div className="text-gray-600">{billingAddress.phone}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                    <div className="flex items-center mb-4">
                      <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="text-xl font-bold text-green-800">Adresa e dërgimit</h3>
                    </div>
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={sameAsBilling}
                          onChange={(e) => setSameAsBilling(e.target.checked)}
                          className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500 focus:ring-2 mr-3"
                        />
                        <span className="font-medium text-green-800">E njejtë me adresen e faturimit</span>
                      </label>
                    </div>
                    {sameAsBilling ? (
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-800">{billingAddress.name}</div>
                        <div className="text-gray-600">{billingAddress.address}</div>
                        <div className="text-gray-600">{billingAddress.phone}</div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Emri dhe mbiemri"
                          className="w-full px-3 py-2 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          placeholder="Adresa"
                          className="w-full px-3 py-2 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          placeholder="Telefoni"
                          className="w-full px-3 py-2 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {cartItems.length === 0 ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                      </svg>
                      Shporta është bosh
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Finalizo blerjen - €{total.toFixed(2)}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Enhanced Order Summary Sidebar */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-4">
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
                  <>
                    <div className="space-y-6 mb-8">
                      {cartItems.map((item) => (
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
                                <div className="text-lg font-semibold text-blue-600">
                                  {item.quantity} x €{item.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                                <span className="mr-2">✓</span>
                                <span className="text-sm font-medium">Në dispozicion</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
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
                          <span className="font-semibold">€{(total - shipping).toFixed(2)}</span>
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
                  </>
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