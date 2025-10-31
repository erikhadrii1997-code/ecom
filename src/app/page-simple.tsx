export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Store</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Store</h2>
          <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Electronics</h3>
              <p className="text-gray-600">Latest gadgets and tech products</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Fashion</h3>
              <p className="text-gray-600">Trendy clothing and accessories</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Home & Garden</h3>
              <p className="text-gray-600">Everything for your home</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}