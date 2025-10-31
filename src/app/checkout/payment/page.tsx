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

export default function PaymentPage() {
  const [formData, setFormData] = useState<CheckoutFormData | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  // Load form data and cart items from localStorage
  useEffect(() => {
    try {
      const savedFormData = localStorage.getItem('checkoutFormData')
      const savedCart = localStorage.getItem('cart')
      
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData))
      } else {
        // Redirect back to checkout if no form data
        window.location.href = '/checkout'
        return
      }
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading data:', error)
      window.location.href = '/checkout'
    }
  }, [])

  const shipping = 0.00
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = subtotal + shipping

  // PayPal Integration with your provided code
  useEffect(() => {
    if (typeof window !== 'undefined' && paymentMethod === 'paypal') {
      // Load PayPal SDK
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=ARYOpSlIb3YT14BrKtINl6LvCNa-FxtQ-2FDr1U2KpxoAt6GHqt-eWp7nYKNAeKK1h7ZRzJrhcbwKYli&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card`
      script.setAttribute('data-sdk-integration-source', 'developer-studio')
      
      script.onload = () => {
        if ((window as any).paypal && (window as any).paypal.Buttons) {
          // Clear existing buttons
          const container = document.querySelector("#paypal-button-container")
          if (container) {
            container.innerHTML = ''
          }
          
          const paypalButtons = (window as any).paypal.Buttons({
            style: {
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "paypal",
            },
            message: {
              amount: total,
            },
            async createOrder() {
              try {
                const response = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    amount: total,
                    currency: "USD",
                    items: cartItems.map(item => ({
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity
                    }))
                  }),
                })

                const orderData = await response.json()

                if (orderData.orderID) {
                  return orderData.orderID
                }
                
                const errorDetail = orderData?.details?.[0]
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData)

                throw new Error(errorMessage)
              } catch (error) {
                console.error(error)
                resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`)
              }
            },
            async onApprove(data: any, actions: any) {
              try {
                const response = await fetch(`/api/paypal/capture-order`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    orderID: data.orderID
                  })
                })

                const orderData = await response.json()
                const errorDetail = orderData?.details?.[0]

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart()
                } else if (errorDetail) {
                  throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
                } else if (!orderData.success) {
                  throw new Error(JSON.stringify(orderData))
                } else {
                  // Success - clear cart and redirect
                  localStorage.removeItem('cart')
                  localStorage.removeItem('checkoutFormData')
                  
                  // Save order details
                  const orderDetails = {
                    transactionId: orderData.transactionID,
                    amount: total,
                    items: cartItems,
                    customerInfo: formData,
                    timestamp: new Date().toISOString()
                  }
                  localStorage.setItem('lastOrder', JSON.stringify(orderDetails))
                  
                  resultMessage(`Transaction successful: ${orderData.transactionID}<br><br>Redirecting to confirmation...`)
                  
                  setTimeout(() => {
                    window.location.href = '/checkout/confirm'
                  }, 2000)
                }
              } catch (error) {
                console.error(error)
                resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`)
              }
            },
          })
          
          paypalButtons.render("#paypal-button-container")
        }
      }
      
      document.head.appendChild(script)
      
      return () => {
        document.head.removeChild(script)
      }
    }
  }, [paymentMethod, total, cartItems, formData])

  const resultMessage = (message: string) => {
    const container = document.querySelector("#result-message")
    if (container) {
      container.innerHTML = message
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading payment page...</p>
        </div>
      </div>
    )
  }

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
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      ✓
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-green-600">Adresa e transportit</span>
                      <p className="text-sm text-gray-500">Përfunduar</p>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-gradient-to-r from-green-400 to-blue-600 rounded-full mx-4"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                      2
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-blue-600">Mënyra e pagesës</span>
                      <p className="text-sm text-gray-500">Zgjidhni pagesën</p>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Payment Method Selection */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Mënyra e pagesës</h2>
                      <p className="text-gray-600">Zgjidhni metodën tuaj të preferuar të pagesës</p>
                    </div>
                  </div>
                </div>

                {/* Payment Method Options */}
                <div className="space-y-6 mb-8">
                  {/* PayPal Option */}
                  <div className="border-2 border-yellow-300 rounded-xl p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <label className="flex items-center space-x-4 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-yellow-600 border-2 border-yellow-300 focus:ring-yellow-500 focus:ring-2"
                      />
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.587.831 5.992 2.4 1.355 1.52 2.046 3.624 1.999 6.083-.098 5.097-2.92 8.549-8.487 8.549H9.2c-.613 0-1.123.372-1.285.928l-.804 3.457c-.067.402-.414.677-.832.677z"/>
                          </svg>
                        </div>
                        <div>
                          <span className="text-lg font-bold text-gray-900">Paguaj me kartë</span>
                          <p className="text-sm text-gray-600">PayPal, kartë krediti/debiti, Apple Pay</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* PayPal Button Container */}
                {paymentMethod === 'paypal' && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Përfundoni pagesën tuaj</h3>
                    <div id="paypal-button-container" className="mb-4"></div>
                    <div id="result-message" className="text-center text-sm"></div>
                  </div>
                )}

                {/* Back Button */}
                <div className="mt-8">
                  <button
                    onClick={() => window.location.href = '/checkout'}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Kthehu te të dhënat personale
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-4">
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Përmbledhje
                    </h3>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-gray-600">Sasia: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-blue-600">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

