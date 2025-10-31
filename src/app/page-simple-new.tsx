export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">🛍️ My Store</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Our Store</h2>
          <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Shop Now
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Technology</h3>
            <p className="text-gray-600 mb-4">Latest gadgets and tech products</p>
            <a href="/teknologji" className="text-blue-600 font-medium hover:text-blue-800">
              Browse Technology →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">Home & Garden</h3>
            <p className="text-gray-600 mb-4">Furniture and home essentials</p>
            <a href="/house" className="text-blue-600 font-medium hover:text-blue-800">
              Browse Home →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">💄</div>
            <h3 className="text-xl font-semibold mb-2">Cosmetics</h3>
            <p className="text-gray-600 mb-4">Beauty and personal care</p>
            <a href="/cosmetics" className="text-blue-600 font-medium hover:text-blue-800">
              Browse Cosmetics →
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">⚽</div>
            <h3 className="text-xl font-semibold mb-2">Sports</h3>
            <p className="text-gray-600 mb-4">Athletic wear and equipment</p>
            <a href="/sport" className="text-blue-600 font-medium hover:text-blue-800">
              Browse Sports →
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">iPhone 15 Pro</h4>
                <p className="text-gray-600 text-sm mb-2">Latest technology</p>
                <p className="text-blue-600 font-bold">€999</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-6xl">🛋️</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Premium Sofa</h4>
                <p className="text-gray-600 text-sm mb-2">Comfortable seating</p>
                <p className="text-blue-600 font-bold">€599</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-6xl">⚽</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Nike Hoodie</h4>
                <p className="text-gray-600 text-sm mb-2">Athletic wear</p>
                <p className="text-blue-600 font-bold">€89</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 My Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}