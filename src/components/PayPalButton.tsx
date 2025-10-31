'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'

interface PayPalButtonProps {
  amount: number
  currency?: string
  items?: Array<{
    name: string
    price: number
    quantity: number
  }>
  onSuccess?: (details: any) => void
  onError?: (error: any) => void
}

export default function PayPalButton({ 
  amount, 
  currency = 'USD', 
  items = [],
  onSuccess,
  onError 
}: PayPalButtonProps) {
  const [loading, setLoading] = useState(false)

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: currency,
    intent: 'capture',
  }

  const createOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          items
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      return data.orderID
    } catch (error) {
      console.error('Error creating PayPal order:', error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const onApprove = async (data: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID
        }),
      })

      const details = await response.json()

      if (!response.ok) {
        throw new Error(details.error || 'Failed to capture payment')
      }

      onSuccess?.(details)
      
      // Show success message
      alert('Payment successful! Thank you for your purchase.')
      
    } catch (error) {
      console.error('Error capturing PayPal payment:', error)
      onError?.(error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onErrorHandler = (error: any) => {
    console.error('PayPal error:', error)
    onError?.(error)
    alert('Payment error. Please try again.')
  }

  const onCancel = (data: any) => {
    console.log('PayPal payment cancelled:', data)
    alert('Payment was cancelled.')
  }

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">PayPal Client ID not configured</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-center">Processing payment...</p>
        </div>
      )}
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 40
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onErrorHandler}
          onCancel={onCancel}
          disabled={loading}
        />
      </PayPalScriptProvider>
    </div>
  )
}