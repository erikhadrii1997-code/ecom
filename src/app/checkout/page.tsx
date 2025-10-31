'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import PayPalButton from '@/components/PayPalButton'
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
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashConfirmed, setCashConfirmed] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [form, setForm] = useState<{ [key: string]: string } & {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    paymentMethod: string;
  }>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    paymentMethod: 'cash',
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Simulate add to cart and continue to checkout step
  const handleProceedToCheckout = (product: any) => {
    // Optionally add product to cart here
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 mb-8 p-0 bg-transparent rounded-xl shadow-none">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-neutral-200 p-4 relative overflow-hidden flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold mb-4 text-neutral-900 text-center tracking-tight">Checkout</h2>
        <form className="mb-4 grid grid-cols-2 gap-3">
          {/* Floating labels, glassmorphism fields, compact layout, labels always above */}
          {['firstName','lastName','email','phone','address','city'].map((field, i) => (
            <div key={field} className="flex flex-col gap-1 col-span-2 md:col-span-1">
              <label className="text-neutral-700 text-xs font-semibold mb-0.5" htmlFor={field}>
                {field==='firstName' ? 'Emri' : field==='lastName' ? 'Mbiemri' : field==='email' ? 'Email' : field==='phone' ? 'Telefoni' : field==='address' ? 'Adresa' : 'Qyteti'}
              </label>
              <input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleFormChange}
                type={field==='email' ? 'email' : 'text'}
                className="w-full px-2 py-2 border border-neutral-300 rounded bg-white/70 shadow focus:ring-2 focus:ring-neutral-400 focus:outline-none text-sm font-medium"
              />
            </div>
          ))}
        </form>
        <div className="mb-4">
          <h3 className="text-base font-bold mb-1 text-neutral-700">Produkte në shportë</h3>
          <div className="bg-white/80 backdrop-blur-lg p-2 rounded-lg shadow border border-neutral-100 max-h-48 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-neutral-500">Shporta është bosh.</div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-2 px-1">
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-900 text-xs">{item.name}</span>
                      <span className="text-neutral-500 text-xs">Sasia: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-neutral-700 text-xs">€{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <div className="pt-2 text-right text-xs font-bold text-neutral-900">Totali: €{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <div className="flex-1 flex flex-col items-center justify-center bg-white/70 backdrop-blur-lg rounded-lg shadow p-2 border border-neutral-200">
            <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-7 h-7 mb-1" />
            <h3 className="text-xs font-bold text-neutral-700 mb-0.5">Paguaj Online me PayPal</h3>
            <p className="text-neutral-600 text-center text-[10px] mb-1">Pagesa e sigurt, e shpejtë dhe e mbrojtur.<br />Nuk ka nevojë për llogari PayPal!</p>
            <PayPalButton
              amount={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
              currency="EUR"
              items={cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity }))}
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-white/70 backdrop-blur-lg rounded-lg shadow p-2 border border-neutral-200">
            <h3 className="text-xs font-bold text-neutral-700 mb-0.5">Paguaj në dorë në pranim</h3>
            <p className="text-neutral-600 text-center text-[10px] mb-1">Pagesa në dorë në momentin e dorëzimit.<br />Informacioni i dërgesës do të dërgohet në emailin tuaj.</p>
            <button
              className="w-full bg-neutral-900 text-white py-2 rounded font-bold text-xs shadow hover:scale-105 hover:bg-neutral-800 transition-all duration-200"
              onClick={() => setShowCashModal(true)}
            >
              <span className="flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" /></svg>
                Paguaj në dorë në pranim
              </span>
            </button>
            {/* Cash confirmation modal */}
            {showCashModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-2xl p-4 border border-neutral-300 max-w-xs w-full flex flex-col items-center">
                  <h4 className="text-base font-bold text-neutral-900 mb-2">Porosia u pranua!</h4>
                  <p className="text-neutral-700 text-center mb-3 text-xs">Informacioni i dërgesës do të dërgohet në emailin tuaj:<br /><span className="font-bold">{form.email}</span></p>
                  <button
                    className="bg-neutral-900 text-white py-1 px-3 rounded font-bold text-xs shadow hover:bg-neutral-800 transition"
                    onClick={() => { setShowCashModal(false); setCashConfirmed(true); }}
                  >Mbyll</button>
                </div>
              </div>
            )}
            {cashConfirmed && (
              <div className="mt-1 text-neutral-700 font-bold text-center text-xs">Porosia juaj është pranuar! Kontrolloni emailin për detaje.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}