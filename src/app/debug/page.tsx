export default function TestMainPage() {
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🛒 E-Commerce App Test
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Testing if the app shows properly
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            App Status: Working ✅
          </h2>
          <p className="text-gray-600">
            If you see this page, the Next.js app is running correctly.
          </p>
          <div className="mt-4 space-y-2">
            <a href="/" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go to Main Page
            </a>
            <a href="/house" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Go to House Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}